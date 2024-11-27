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
            console.log('args', args.id)
            return Author.find(author => author.id == args.id)

        },

        // return Post array
        posts() {
            return Post
        },

        // return single post
        postById: (_, arg) => {
            const { id } = arg

            return Post.find(post => post.id == id)
        }


    }
}

export { resolvers }