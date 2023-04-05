const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
// const http = require("http");
const config = require("./config/config.js");
// const Logging = require("./library/Logging.js");
const typeDefs = require("./models/schema.js");
const resolvers = require("./resolver/resolver.js");

const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

//Load db methods

const mongoDataMethod = require("./data/db.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  let server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      mongoDataMethod,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Sever ready at http://127.0.0.1:4000${server.graphqlPath}`);
});
