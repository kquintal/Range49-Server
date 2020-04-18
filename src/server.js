require('dotenv').config();

const { ApolloServer } = require('apollo-server-express')
// const dataSources = require('./data-sources')
const { typeDefs, resolvers } = require('./apollo')

const port = process.env.PORT || 3001

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Someone subscribed!")
      // ...
    },
    onDisconnect: (webSocket, context) => {
      console.log("Someone Disconnected!")
      // ...
    },
  },
  context: async ({ req, connection }) => ({
    currentUser: { //TODO: find an authentication system 
      name: "Hello",
      description: "World"
    },
  }),
  // dataSources: () => (dataSources),
});

const http = require('http');
const express = require('express');

const app = express();
apolloServer.applyMiddleware({ app })
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`)
})
