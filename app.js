const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use(blogRouter)

module.exports = app
