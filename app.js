const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use('/api/blogs', blogRouter)
app.use('/api/users/', userRouter)

module.exports = app
