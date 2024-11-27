export const typeDefs = `#graphql
  type Author {
    id: ID!,
    name: String!,
    email: String,
    gender: String!,
    hobbies: [String!]!,
    posts: [Post!]!
  }

  type Post {
    id: ID,
    title: String!,
    content: String!,
    createdAt: String!
    authorId: Int!, 
    tags: [String!]!,
    author: Author!
  }

  type Query {
    authors: [Author]
    posts: [Post]
    authorById(id: ID!): Author
    postById(id: ID!): Post
}
`;