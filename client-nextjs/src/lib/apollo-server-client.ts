import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

console.log(
  "Creating Apollo Client with SSR mode",
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
);
export function getClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "http://server:4000/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
