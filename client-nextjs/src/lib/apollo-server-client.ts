import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
if (!endpoint) {
  throw new Error(
    "NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set in apollo-server-client.ts"
  );
}
console.log("Creating Apollo Client with endpoint:", endpoint);

// Function to create a new Apollo Client instance
// This is useful for server-side rendering (SSR) or when you need a fresh client instance
export function getClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: endpoint,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
