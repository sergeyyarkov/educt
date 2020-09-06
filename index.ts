import express from 'express'
import fs from 'fs'
import { ApolloServer, gql } from 'apollo-server-express'

const PORT = process.env.PORT || 4000

const startServer = () => {
  try {
    const app = express()

    const resolvers = require('./graphql/resolvers')
    const typeDefs = gql(fs.readFileSync('./graphql/typeDefs/schema.graphql', { encoding: 'utf8' }))

    const server = new ApolloServer({ typeDefs, resolvers })

    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () => console.log(`🚀 Server ready on port: ${PORT}`))
  } catch (err) {
    console.log(`❌  Something went wrong: \n ${err}`)
  }
}

startServer()