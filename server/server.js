const path = require('path')
const express = require('express')
const server = express()
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
// routes
const auth = require('./routes/auth')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use('/api/v1/auth/', auth)

module.exports = server
