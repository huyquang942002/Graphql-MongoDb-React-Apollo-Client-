const { ApolloServer } = require("apollo-server-express");

const express = require("express");

const typeDefs = require("../models/schema.js");

const resolvers = require("../resolver/resolver.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

async function startServer() {
  let server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Sever ready at http://127.0.0.1:4000${server.graphqlPath}`);
});
