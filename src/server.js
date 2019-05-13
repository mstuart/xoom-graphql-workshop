const { ApolloServer } = require('apollo-server');
const JSONPlaceholderAPI = require('./JSONPlaceholderAPI');
const { resolvers, typeDefs } = require('./graphql');

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
