import { ApolloClient, createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/graphql'
  })
});

export function provideClient(): ApolloClient {
  return client;
}
