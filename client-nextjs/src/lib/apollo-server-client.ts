import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export function getClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
