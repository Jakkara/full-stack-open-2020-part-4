const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(result)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Invalid or missing token' })
  }
  const user = await User.findById(decodedToken.id)

  if ('url' in body && 'title' in body) {
    const { title, author, url, likes } = body

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  if ('url' in body && 'title' in body) {
    const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter
