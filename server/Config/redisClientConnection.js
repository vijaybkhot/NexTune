import redis from "redis";

const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis Client Error in redisClientConnection", err);
});

const connectToRedis = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err.message);
  }
};

export { client, connectToRedis };
