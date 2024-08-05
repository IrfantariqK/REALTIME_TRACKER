import { MongoClient } from "mongodb";

// Type definition for global
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let uri = process.env.MONGODB_URI as string;
let dbName = process.env.MONGODB_DB as string;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!process.env.MONGODB_DB) {
  throw new Error("Please add your Mongo DB name to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to ensure a single connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create a new MongoClient instance in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
