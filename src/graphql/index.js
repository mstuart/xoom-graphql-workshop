const path = require('path');
const {
  fileLoader,
  mergeResolvers,
  mergeTypes
} = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './**'), {
  extensions: ['.graphql'],
  recursive: true
});

const resolversArray = fileLoader(path.join(__dirname, './**'), {
  extensions: ['.js'],
  recursive: true,
  globOptions: { ignore: ['**/data/**', '**/*.test.js'] }
});

module.exports = {
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray)
};