import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  console.error("❌ Missing REDIS_URL in environment variables");
}

const client = createClient({
  url: REDIS_URL,
});

client.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

const connectToRedis = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to Upstash Redis");
  } catch (err) {
    console.error("❌ Error connecting to Redis:", err.message);
  }
};

export { client, connectToRedis };
