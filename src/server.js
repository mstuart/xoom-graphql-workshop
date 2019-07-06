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
    albums(id: ID, userId: ID): [Album]

    # Find an album with a certain id
    album(id: ID!): Album
  }

  type Album {
    # The Album's ID
    id: ID

    # The title of the album (Ex: "Nevermind")
    title: String

    # The User associated with this album
    user: User

    # The User ID that is associated this album
    userId: ID @deprecated(reason: "'userId' is not that useful. Use 'user' instead.")
  }

  type User {
    # The User's ID (Ex: "1")
    userId: ID

    # The User's name (Ex: "Leanne Graham")
    name: String

    # The User's username (Ex: "lgraham")
    username: String

    # The User's email (Ex: "lgraham@yahoo.com")
    email: String

    # The User's address. See Address type.
    address: Address

    # The User's phone number (Ex: "1-800-COLLECT")
    phone: String

    # The User's website (Ex: "google.com")
    website: String

    # The User's company. See Company type.
    company: Company
  }

  type Address {
    # The Address' first line (Ex: "123 Main St")
    line1: String

    # The Address' second line (Ex: "Apt 456")
    line2: String

    # The Address' city (Ex: "San Jose")
    city: String

    # The Address' postal code (Ex: "95050")
    postalCode: String

    # The Address' geo coordinates.  See GeoCoordinates type.
    geoCoordinates: GeoCoordinates
  }

  type GeoCoordinates {
    # Latitude (Ex: "-37.3159")
    latitude: String

    # Longitude (Ex: "91.1496")
    longitude: String
  }

  type Company {
    # Company's name (Ex: "Hooli")
    name: String

    # Company's catch phrase (Ex: "I like turtles")
    catchPhrase: String

    # Company's bullshit catch phrase (Ex: "Making the world a better place")
    bullshit: String
  }
`;

const resolvers = {
  Query: {
    albums: async (rootObj, { id, userId }) => {
      const albums = await get('/albums');

      if (id) {
        return albums.filter(album => album.id === Number(id));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { id }) => {
      const albums = await get('/albums');

      return albums.find(album => album.id === Number(id));
    }
  },

  Album: {
    // NOTE: This is only ever invoked if a "user" field is requested.
    //
    // If you offered this capability in REST, you would pay the cost of
    // resolving "user" whether or not your client actually needed that field.
    user: async ({ userId }) => await get(`/users/${userId}`)
  },

  User: {
    userId: ({ id }) => id
  },

  Address: {
    line1: ({ street }) => street,
    line2: ({ suite }) => suite,
    postalCode: ({ zipcode }) => zipcode,
    geoCoordinates: ({ geo }) => geo
  },

  Company: {
    bullshit: ({ bs }) => bs
  },

  GeoCoordinates: {
    latitude: ({ lat }) => lat,
    longitude: ({ lng }) => lng
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
