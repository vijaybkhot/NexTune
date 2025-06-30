import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

// Optional: Validate required env variables
const { REDIS_USER, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;
if (!REDIS_USER || !REDIS_PASSWORD || !REDIS_HOST || !REDIS_PORT) {
  console.error("❌ Missing Redis environment variables");
}

const client = createClient({
  username: REDIS_USER,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

client.on("error", (err) =>
  console.error("❌ Redis Client Error in redisClientConnection:", err)
);

const connectToRedis = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to Redis Cloud");
  } catch (err) {
    console.error("❌ Error connecting to Redis:", err.message);
  }
};

export { client, connectToRedis };
