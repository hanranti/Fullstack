const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

const blogsRouter = require('./routes/blogsRouter')
const blogsApiUrl = '/api/blogs'
app.use(blogsApiUrl, blogsRouter)

const usersRouter = require('./routes/usersRouter')
const usersApiUrl = '/api/users'
app.use(usersApiUrl, usersRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app