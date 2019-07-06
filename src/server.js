const { ApolloServer } = require('apollo-server');
const JSONPlaceholderAPI = require('./JSONPlaceholderAPI');

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
    albums: async (rootObj, { id, userId }, { dataSources }) => {
      const albums = await dataSources.jsonPlaceholderAPI.getAlbums();

      if (id) {
        return albums.filter(album => album.id === Number(id));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { id }, { dataSources }) =>
      await dataSources.jsonPlaceholderAPI.getAlbumById(id)
  },

  Album: {
    user: async ({ userId }, args, { dataSources }) =>
      await dataSources.jsonPlaceholderAPI.getUserById(userId)
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
