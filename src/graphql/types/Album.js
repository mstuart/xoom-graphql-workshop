module.exports = {
  Album: {
    user: async ({ userId }, args, { dataSources }) =>
      await dataSources.jsonPlaceholderAPI.getUserById(userId)
  }
};
