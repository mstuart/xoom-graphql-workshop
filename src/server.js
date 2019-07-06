const { ApolloServer } = require('apollo-server');
const axios = require('axios');
const https = require('https');

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',

  // May get SSL errors w/ depending on your network,
  // so we will ignore any SSL errors for now.
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const get = async url => client.get(url).then(({ data }) => data);

const typeDefs = `
  type Query {
    # A list of albums. See Album type
    albums: [Album]
  }

  type Album {
    # The Album's ID
    id: ID

    # The User ID that is associated this album
    userId: ID

    # The title of the album (Ex: "Nevermind")
    title: String
  }
`;

const resolvers = {
  Query: {
    // We're using an async function called "get" that hits the
    // http://jsonplaceholder.typicode.com/ API.  We're fetching
    // the GET /posts resource and returning it.
    //
    // By returning it, it's available to Album resolvers as "rootObj".
    // "rootObj" is used for passing data from parent-to-child.
    //
    albums: async () => await get('/albums')

    // EXERCISE #1 -- Currently, we're returning the entire list of albums
    //
    // It's likely that our clients may want a single album with a given ID.
    // Let's create another field called "album" that takes a required parameter
    // called "id" that returns that particular Album.
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running at ${url}`));
