const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const tokenExtractor = require('./middleware/tokenExtractor')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use(tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
