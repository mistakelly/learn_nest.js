// database
import { Post } from './entities/post.entity.mjs'
import { Author } from './entities/authors.entity.mjs'


const resolvers = {
    Query: {
        authors() {
            return Author
        },

        posts() {
            return Post
        },

        authorById(_, args) {
            console.log('args', args.id)
            // return a single author
            return Author.find(author => author.id == args.id)

        }
    }
}

export { resolvers }