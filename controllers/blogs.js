const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogRouter.post('/api/blogs', async (request, response) => {
  const blogData = request.body
  if ('url' in blogData && 'title' in blogData) {
    const blog = new Blog(blogData)
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter
