import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import {
  connectToRedis,
  client as redisClient,
} from "./Config/redisClientConnection.js";
import { dbConnection } from "./Config/mongoConnection.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL || "https://your-deployment-url.com"
    : `http://localhost:${PORT}`;

const app = express();
app.use(express.json());

async function getContext({ req }) {
  const queryString = req.body.query;
  return { redisClient, queryString };
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  try {
    // ✅ Connect to MongoDB
    await dbConnection();

    // ✅ Connect to Redis
    await connectToRedis();

    // ✅ Start Apollo Server
    await apolloServer.start();

    app.use(
      "/graphql",
      cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
      }),
      apolloMiddleware(apolloServer, {
        context: getContext,
        cors: false,
      })
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 GraphQL endpoint: ${BASE_URL}/graphql`);
      console.log(`🌐 Client origin: ${CLIENT_ORIGIN}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
})();
