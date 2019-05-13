const { ApolloServer } = require('apollo-server');
const axios = require('axios');

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const get = url => {
  console.log(`${url} is being requested!`);
  return client.get(url).then(({ data }) => data);
};

const typeDefs = `
  type Query {
    # Returns all albums
    albums(albumId: ID, userId: ID): [Album]

    # Find an album with a certain albumId
    album(albumId: ID!): Album
  }

  type Album {
    # The Album's ID
    albumId: ID

    # The title of the album (Ex: "Nevermind")
    title: String

    # The User associated with this album
    user: User

    # The User ID that is associated this album
    userId: ID @deprecated
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
    albums: async (rootObj, { albumId, userId }) => {
      const albums = await get('/albums');

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }) => {
      const albums = await get('/albums');

      return albums.find(album => album.id === Number(albumId));
    }
  },

  Album: {
    albumId: ({ id }) => id,

    // EXERCISE #4 -- Oops, we have a problem!
    // We're causing unnecessary pressure on the https://jsonplaceholder.typicode.com API.
    // Surprised they haven't shut us off yet :-)
    //
    // See the console.log line on line 9 (up above).
    // Go back to GraphQL Playground and request all albums (no arguments) with their associated users.
    // Now, check your console for the console.log() message.
    // 💩!  We're making the same API call a bunch of times!
    //
    // Part #1 --
    // We need to dedupe these API calls.
    // There are a couple options out there, but let's create an Apollo data source.
    // Apollo data sources will dedupe API calls to ensure we're always fetching efficiently.
    // Follow the docs at https://www.apollographql.com/docs/apollo-server/features/data-sources
    //
    // Once you are using your new data source, use it and uncomment the console.log() line at line 9 again (up above).
    // If it's working properly, you'll see that we no longer overfetch.
    //
    // Sweet!  Now we're fetching optimally.  We are so cool!  Wow!  :-D
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
