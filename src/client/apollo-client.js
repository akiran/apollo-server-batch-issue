import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { BatchHttpLink } from "apollo-link-batch-http";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new BatchHttpLink() // new HttpLink()
});

export default client;
