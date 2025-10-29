import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI || "").trim();
if (!uri) {
  // Do not throw here; NextAuth will call and we want a clearer error downstream
  // eslint-disable-next-line no-console
  console.warn("MONGODB_URI is not set. Set it in your .env.local to enable NextAuth adapter.");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise as Promise<MongoClient>;

export default clientPromise;

