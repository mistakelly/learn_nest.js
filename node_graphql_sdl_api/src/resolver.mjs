// Database imports
import { Post } from './entities/post.entity.mjs';
import { Author } from './entities/authors.entity.mjs';

// Helper functions to avoid repetition
/**
 * Finds the index of an item in an array based on its `id`.
 */
const findIndexById = (array, id) => array.findIndex(item => item.id === parseInt(id, 10));

/**
 * Finds an item in an array based on its `id`.
 */
const findById = (array, id) => array.find(item => item.id == id);

/**
 * Generates a new ID for an item based on the last item's ID in the array.
 */
const generateNewId = (array) => (array[array.length - 1]?.id || 0) + 1;

// Resolvers define how queries and mutations should behave
const resolvers = {
    // Query resolvers: Handle fetching data
    Query: {
        /**
         * Returns the list of all authors.
         * @returns {Array} - An array of authors.
         */
        authors: () => Author,

        /**
         * Returns a single author based on their ID.
         * @returns {Object} - The author with the given ID or `undefined`.
         */
        authorById: (_, args) => findById(Author, args.id),

        /**
         * Returns the list of all posts.
         * @returns {Array} - An array of posts.
         */
        posts: () => {
            return Post;
        },

        /**
         * Returns a single post based on its ID.
         * @returns {Object} - The post with the given ID or `undefined`.
         */
        postById: (_, { id }) => findById(Post, id),
    },

    // Resolver relationships: Define how nested fields are resolved
    Author: {
        /**
         * Returns all posts written by a specific author.
         * @param {Object} parent - The parent object representing the author.
         * @returns {Array} - An array of posts written by the author.
         */
        posts: (parent) => Post.filter(post => post.authorId == parent.id),
    },

    Post: {
        /**
         * Returns the author of a specific post.
         * @param {Object} parent - The parent object representing the post.
         * @returns {Object} - The author of the post or `undefined`.
         */
        author: (parent) => findById(Author, parent.authorId),
    },

    // Mutation resolvers: Handle creating, updating, and deleting data
    Mutation: {

        // AUTHOR MUTATIONS
        
        /**
         * Creates a new author and adds it to the Author array.
         * @returns {Object} - The newly created author.
         */
        createAuthor: (_, args) => {
            const newAuthor = { id: generateNewId(Author), ...args };
            Author.push(newAuthor);
            return newAuthor;
        },


        /**
              * Updates an existing author's details based on their ID.
              * @returns {Object} - The updated author or `null` if not found.
              */
        updateAuthor: (_, args) => {
            const authorIdx = findIndexById(Author, args.id);
            if (authorIdx === -1) {
                console.log('Author not found');
                return null;
            }
            Author[authorIdx] = { ...Author[authorIdx], ...args, updatedAt: new Date().toISOString() };
            return Author[authorIdx];
        },

        /**
         * Deletes an author based on their ID.
         * @returns {Object} - The deleted author or `null` if not found.
         */
        deleteAuthor: (_, { id }) => {
            const authorIdx = findIndexById(Author, id);
            if (authorIdx === -1) {
                return null;
            }
            return Author.splice(authorIdx, 1)[0];
        },

        // POST MUTATIONS
        /**
         * Creates a new post and adds it to the Post array.
         * @returns {Object} - The newly created post.
         */
        createPost: (_, args) => {
            const newPost = { id: generateNewId(Post), ...args, createdAt: new Date().toISOString() };
            Post.push(newPost);
            return newPost;
        },

        /**
         * Updates an existing post's details based on its ID.
         * @returns {Object} - The updated post or `null` if not found.
         */
        updatePost: (_, args) => {
            const authorIdx = findIndexById(Author, args.authorId);
            const postIdx = findIndexById(Post, args.id);

            if (authorIdx === -1 || postIdx === -1) {
                return null;
            }

            Post[postIdx] = { ...Post[postIdx], ...args, updatedAt: new Date().toISOString() };
            return Post[postIdx];
        },

        /**
         * Deletes a post based on its ID.
         * @returns {Object} - The deleted post or `null` if not found.
         */
        deletePost: (_, { id }) => {
            const postIdx = findIndexById(Post, id);
            if (postIdx === -1) {
                return null;
            }
            return Post.splice(postIdx, 1)[0];
        },
    },
};

export { resolvers };
