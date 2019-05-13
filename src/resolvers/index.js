const query = require('./query');
const movie = require('./movie');

module.exports = {
  ...query,
  ...movie
};
