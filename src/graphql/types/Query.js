module.exports = {
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
  }
};
