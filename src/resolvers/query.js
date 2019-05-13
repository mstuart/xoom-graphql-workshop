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
    movies: async (root, args, context, info) => {
      const { results } = await get('/discover/movie');

      return results;
    },

    movie: async (rootObj, { id }) => await get(`/movie/${id}`)
  }
};
