import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

export const mongoConfig = {
  serverUrl: process.env.MONGO_URI,
  database: "NexTune",
};
