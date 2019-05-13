module.exports = {
  Query: {
    albums: async (rootObj, { albumId, userId }, { dataSources }) => {
      const albums = await dataSources.jsonPlaceholderAPI.getAlbums();

      if (albumId) {
        return albums.filter(album => album.id === Number(albumId));
      }

      if (userId) {
        return albums.filter(album => album.userId === Number(userId));
      }

      return albums;
    },

    album: async (rootObj, { albumId }, { dataSources }) => {
      const albums = await dataSources.jsonPlaceholderAPI.getAlbums();

      return albums.find(album => album.id === Number(albumId));
    }
  }
};
