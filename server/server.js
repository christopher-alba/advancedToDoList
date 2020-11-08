if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const server = express()
const gqlSchema = require('./graphql')

// routes
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use('/api/v1/auth/', require('./routes/auth'))

server.use(
  '/graphql',
  graphqlHTTP({
    schema: gqlSchema,
    graphiql: true
  })
)

module.exports = server
