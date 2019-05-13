const { ApolloServer } = require('apollo-server');
const JSONPlaceholderAPI = require('./JSONPlaceholderAPI');
const { resolvers, typeDefs } = require('./graphql');

// You might've wondered.. what does a real GraphQL project look like in practice?
//
// Previously, our server.js file was a couple hundred lines long.
// It did a lot. It's a server. It has all of your schema and resolvers.
// It has all of your data-fetching and business logic.
//
// Now, we moved our schemas and resolvers out into other files and directories.
// Maybe in the future we can add tests alongside them too.
//
// Oddly enough, there aren't default tools to handle merging in a safe way.
// As if this writing, you can't just string concat schemas because they might override each other
// and not merge together properly.
//
// `merge-graphql-schemas` handles this well. There are a few other alternatives too.
//
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    jsonPlaceholderAPI: new JSONPlaceholderAPI()
  })
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
