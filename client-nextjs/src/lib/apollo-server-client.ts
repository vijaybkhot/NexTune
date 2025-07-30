import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

console.log(
  "Creating Apollo Client with SSR mode",
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
);

const endpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";

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
