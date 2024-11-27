import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// types
import { typeDefs } from './schema.mjs'

// resolver
import { resolvers } from './resolver.mjs'

const server = new ApolloServer({
    typeDefs,
    resolvers
})


const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 }
})

console.log('server running on port 3000')