module.exports = `
  type Query {
    movies: [Movie]!
    movie(id: ID): Movie!
  }

  type Movie {
    id: ID
    title: String
    overview: String
    score: Float
    voteCount: Int
  }
`;
