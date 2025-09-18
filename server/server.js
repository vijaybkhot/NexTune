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

// Parse allowed origins from .env
const rawAllowedOrigins = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = rawAllowedOrigins
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean); // remove empty strings

const app = express();
app.use(express.json());

// ✅ Common CORS config (reused for both OPTIONS + requests)
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming request origin:", origin);
    console.log("Allowed origins:", allowedOrigins);

    // Allow requests without an origin (like curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// ✅ Handle preflight explicitly for /graphql
app.options("/graphql", cors(corsOptions));

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

    await redisClient.set("test-key", "hello");
    const value = await redisClient.get("test-key");
    console.log("Redis test value:", value);

    await apolloServer.start();

    // ✅ Apply CORS + Apollo middleware
    app.use(
      "/graphql",
      cors(corsOptions),
      apolloMiddleware(apolloServer, {
        context: getContext,
        cors: false, // disable Apollo internal CORS
      })
    );

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 GraphQL endpoint: ${process.env.BASE_URL || "/graphql"}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
})();
