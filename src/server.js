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
    # Returns all albums
    albums: [Album]

    # Find an album with a certain id
    album(id: ID!): Album
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
    albums: async () => await get('/albums'),

    album: async (rootObj, { id }) => await get(`/albums/${id}`)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
