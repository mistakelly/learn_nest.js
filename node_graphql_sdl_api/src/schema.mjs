export const typeDefs = `#graphql
  # GraphQL Schema Definition Language (SDL) for Authors and Posts

# Author type represents a person who can create posts.
type Author {
    id: ID!                # Unique identifier for the author (required)
    name: String!          # Name of the author (required)
    email: String          # Email address of the author (optional)
    gender: String!        # Gender of the author (required)
    hobbies: [String]      # List of hobbies for the author (optional)
    createdAt: String      # Timestamp when the author was created (optional)
    updatedAt: String      # Timestamp for the last update to the author (optional)
    posts: [Post]          # Relationship: List of posts created by the author
}

# Post type represents an individual blog post or article.
type Post {
    id: ID!                # Unique identifier for the post (required)
    title: String!         # Title of the post (required)
    content: String!       # Content of the post (required)
    createdAt: String      # Timestamp when the post was created (optional)
    updatedAt: String      # Timestamp for the last update to the post (optional)
    authorId: Int          # ID of the author who created the post (optional)
    tags: [String]         # List of tags associated with the post (optional)
    author: Author         # Relationship: The author of the post
}

# Mutation type defines operations for creating, updating, and deleting data.
type Mutation {
    # Create a new author
    createAuthor(
        name: String!,
        email: String!,
        gender: String!,
        hobbies: [String]
    ): Author


    # Update an existing author by ID
    updateAuthor(
        id: ID!,
        name: String!,
        email: String!,
        gender: String!,
        hobbies: [String]
    ): Author
   
    # Delete an existing author by ID
    deleteAuthor(id: ID!): Author

    # Create a new post
    createPost(
        title: String!,
        content: String!,
        authorId: Int!,
        tags: [String]
    ): Post

    # Update an existing post by ID
    updatePost(
        id: Int!,
        title: String!,
        content: String!,
        authorId: Int!,
        tags: [String]
    ): Post

    # Delete an existing post by ID
    deletePost(id: ID!): Post
}

# Query type defines read-only operations for fetching data.
type Query {
    # Fetch a list of all authors
    authors: [Author]

    # Fetch a list of all posts
    posts: [Post]

    # Fetch a single author by their ID
    authorById(id: ID!): Author

    # Fetch a single post by its ID
    postById(id: ID!): Post
}

`;