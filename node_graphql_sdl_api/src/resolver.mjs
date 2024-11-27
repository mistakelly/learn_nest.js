// database
import { Post } from './entities/post.entity.mjs'
import { Author } from './entities/authors.entity.mjs'


const resolvers = {
    Query: {
        // return Author array
        authors() {
            return Author
        },

        // return a single author
        authorById(_, args) {
            return Author.find(author => author.id == args.id)

        },

        // return Post array
        posts() {
            return Post
        },

        // return single post
        postById: () => Post.find(post => post.id == id),
    },

    // Relationships
    Author: {
        posts: (parent) => Post.filter((post) => post.authorId == parent.id)
    },

    Post: {
        author: (parent) => Author.find((post) => post.authorId == parent.id)
    },

    // Mutations
    Mutation: {
        createAuthor: (_, args) => {
            const newUser = Author[Author.length - 1] ? { id: Author[Author.length - 1].id += 1, ...args } : { id: 1, ...args }

            Author.push(newUser)

            return newUser
        },

        deleteAuthor: (_, { id }) => {
            // Find the index of the author with the given id
            const index = Author.findIndex(author => author.id === parseInt(id, 10));

            // If the author is not found, return null or handle it as needed
            if (index === -1) {
                return null;
            }

            // Remove and return the deleted author 
            return Author.splice(index, 1)[0];
        }

    }
}

export { resolvers }