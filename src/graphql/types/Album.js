module.exports = {
  Album: {
    albumId: ({ id }) => id,

    user: async ({ userId }, args, { dataSources }) =>
      await dataSources.jsonPlaceholderAPI.getUserById(userId)
  }
};
