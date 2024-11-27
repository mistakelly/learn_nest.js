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
        }
    }
}

export { resolvers }