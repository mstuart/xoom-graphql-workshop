module.exports = `
  type Query {
    movies: [Movie]!
  }

  type Movie {
    id: ID
    title: String
    overview: String
    score: Float
    voteCount: Int
  }
`;
