const blogRouter = require('express').Router()
const { response } = require('express')
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

blogRouter.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
  const blogData = request.body
  if ('url' in blogData && 'title' in blogData) {
    const result = await Blog.findByIdAndUpdate(request.params.id, blogData, { new: true })
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter
