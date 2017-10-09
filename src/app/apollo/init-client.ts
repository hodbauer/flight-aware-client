import {ApolloClient, createNetworkInterface} from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'graphql-transport-ws';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
  reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

export function provideClient():ApolloClient {
  return client;
}
