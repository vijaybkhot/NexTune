import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
<<<<<<< Updated upstream
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:4000/graphql",
=======
  uri: "/graphql",
>>>>>>> Stashed changes
  cache: new InMemoryCache(),
});

export default client;
