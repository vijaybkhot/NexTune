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
} from "./config/redisClientConnection.js";
import { dbConnection } from "./config/mongoConnection.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const rawAllowedOrigins = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = rawAllowedOrigins
  .split(",")
  .map((origin) => origin.trim());

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
    await dbConnection();
    await connectToRedis();
    await apolloServer.start();

    // ✅ Apply CORS Middleware with Dynamic Origin Check
    app.use(
      "/graphql",
      cors({
        origin: (origin, callback) => {
          console.log("Incoming request origin:", origin);
          console.log("Allowed origins:", allowedOrigins);
          // Allow requests with no origin (like mobile apps or curl)
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      }),
      apolloMiddleware(apolloServer, {
        context: getContext,
        cors: false, // Disable internal Apollo CORS
      })
    );

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 GraphQL endpoint: ${process.env.BASE_URL}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
})();
