module.exports = {
  Movie: {
    id: ({ id }) => id,

    title: ({ title }) => title,

    overview: ({ overview }) => overview,

    score: ({ vote_average }) => vote_average,

    voteCount: ({ vote_count }) => vote_count
  }
};
