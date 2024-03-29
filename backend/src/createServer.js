const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    // Make the database available in the resolvers via the ctx parameter
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
