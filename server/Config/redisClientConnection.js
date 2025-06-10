import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client.on("error", (err) =>
  console.log("❌ Redis Client Error in redisClientConnection:", err)
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
