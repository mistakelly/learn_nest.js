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
        postById: (_, arg) => Post.find(post => post.id == id),
    },
    Author: {
        posts: (parent) => Post.filter(post => post.authorId === parent.id)
    },

    Post: {
        author: (parent) => Author.find(author => author.id == parent.authorId)
    }
}

export { resolvers }