import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import {
  connectToRedis,
  client as redisClient,
} from "./Config/redisClientConnection.js";

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

async function getContext({ req }) {
  const queryString = req.body.query;
  return { redisClient, queryString };
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await connectToRedis();
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
