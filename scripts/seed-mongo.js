/* MongoDB seeder using Mongoose */
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Lightweight .env loader to support running this script directly
// Tries .env.local first, then .env. No external deps required.
function loadEnv() {
  const candidates = [".env.local", ".env"]; // precedence order
  for (const file of candidates) {
    const full = path.resolve(process.cwd(), file);
    if (!fs.existsSync(full)) continue;
    const contents = fs.readFileSync(full, "utf8");
    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      // Remove optional wrapping quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
    // Stop after first file found to preserve precedence
    break;
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

const RateProductSchema = new mongoose.Schema(
  {
    lender: String,
    type: String,
    termYears: Number,
    rateAPR: Number,
    fee: Number,
    ltvMax: Number,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    role: { type: String, default: "ADMIN" }
  },
  { timestamps: true }
);

const RateProduct = mongoose.models.RateProduct || mongoose.model("RateProduct", RateProductSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  await User.updateOne(
    { email: "admin@leadin.com" },
    { $setOnInsert: { email: "admin@leadin.com", name: "Admin", role: "ADMIN" } },
    { upsert: true }
  );

  const sample = [
    { lender: "Metro Bank", type: "fixed", termYears: 5, rateAPR: 4.29, fee: 999, ltvMax: 85 },
    { lender: "Octane Capital", type: "bridging", termYears: 1, rateAPR: 7.1, fee: 0, ltvMax: 75 }
  ];
  for (const r of sample) {
    await RateProduct.updateOne(
      { lender: r.lender, type: r.type, termYears: r.termYears },
      { $set: r },
      { upsert: true }
    );
  }
}

run()
  .then(() => {
    console.log("Mongo seed complete");
    return mongoose.disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
