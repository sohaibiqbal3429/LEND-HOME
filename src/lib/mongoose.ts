import mongoose from "mongoose";

function buildMongoUriFromParts() {
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASS;
  const host = process.env.MONGODB_HOST; // e.g. lendlhome.ymam9nn.mongodb.net
  const db = process.env.MONGODB_DB;
  if (user && pass && host) {
    const encUser = encodeURIComponent(user);
    const encPass = encodeURIComponent(pass);
    const dbPath = db ? `/${db}` : "";
    return `mongodb+srv://${encUser}:${encPass}@${host}${dbPath}?retryWrites=true&w=majority`;
  }
  return "";
}

const MONGODB_URI = ((process.env.MONGODB_URI || "").trim()) || buildMongoUriFromParts();

interface GlobalWithMongoose {
  mongooseConn?: typeof mongoose | null;
  mongoosePromise?: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as unknown as GlobalWithMongoose;

export async function connectMongo() {
  if (globalWithMongoose.mongooseConn) return globalWithMongoose.mongooseConn;
  if (!globalWithMongoose.mongoosePromise) {
    if (!MONGODB_URI) {
      throw new Error("Missing MONGODB_URI. Create .env.local with MONGODB_URI or set it in your environment.");
    }
    globalWithMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined
    });
  }
  globalWithMongoose.mongooseConn = await globalWithMongoose.mongoosePromise;
  return globalWithMongoose.mongooseConn;
}
