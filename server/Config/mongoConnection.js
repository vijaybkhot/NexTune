import { MongoClient } from "mongodb";
import { mongoConfig } from "./settings.js";

let _client;
let _db;

const dbConnection = async () => {
  if (!_client) {
    try {
      _client = new MongoClient(mongoConfig.serverUrl, {});

      await _client.connect();
      console.log("✅ Connected to MongoDB");

      _db = _client.db(mongoConfig.database);
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error);
      throw error;
    }
  }

  return _db;
};

const closeConnection = async () => {
  if (_client) {
    await _client.close();
    console.log("🛑 MongoDB connection closed");
  }
};

export { dbConnection, closeConnection };
