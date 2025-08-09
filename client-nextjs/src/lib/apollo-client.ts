import { ApolloClient, InMemoryCache } from "@apollo/client";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
if (!endpoint) {
  throw new Error(
    "NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set in apollo-client.ts"
  );
}
console.log("Creating Apollo Client with endpoint:", endpoint);
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default client;
