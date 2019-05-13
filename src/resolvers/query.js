const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'da7c1cb04f4c3e1c0834802d529f1bf8'
  }
});

const get = async url => client.get(url).then(({ data }) => data);

module.exports = {
  Query: {
    // We're using an async function called "get" that hits the
    // https://api.themoviedb.org/3/ API.  We're fetching
    // the GET /discover/movie resource and returning it.
    //
    // By returning it, it's available to Movie resolvers as "rootObj".
    // "rootObj" is used for passing data from parent-to-child.
    //
    // See src/resolvers/movie.js for the Movie resolvers
    //
    movies: async (root, args, context, info) => {
      const { results } = await get('/discover/movie');

      return results;
    }

    // EXERCISE #1 -- Currently, we're returning the entire list of movies
    //
    // It's likely that our clients may want a single movie with a given movieId.
    // Let's create another field called "movie" that takes a required parameter
    // called "movieId" that returns that particular Movie.
  }
};
