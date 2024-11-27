export const typeDefs = `#graphql
  type Author {
    id: ID!,
    name: String!,
    email: String,
    gender: String!,
  }

  type Post {
    id: ID,
    title: String!,
    content: String!,
    createdAt: String!
    authorId: Int!, 
  }

  type Query {
    authors: [Author]
    posts: [Post]
    authorById(id: ID!): Autho
}
`;