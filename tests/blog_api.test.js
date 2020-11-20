const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = []
  initialBlogs.map(blogData => {
    blogs.push(new Blog(blogData))
  })
  await Blog.insertMany(blogs)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Blog fetching', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(6)
  })

  test('Blog ID does not have an underscore', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })
})

describe('Blog creation', () => {
  const testBlog = {
    title: 'Created For Test',
    author: 'Testwriter',
    url: 'https://utu.fi',
    likes: 333
  }

  test('Can create blog', async () => {
    const countBefore = await (await api.get('/api/blogs')).body.length
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)

    const resultsAfter = await (await api.get('/api/blogs'))
    const countAfter = resultsAfter.body.length
    expect(countAfter).toBe(countBefore + 1)

    // Check we can find the created blog
    expect(resultsAfter.body.find(item => item.title === testBlog.title)).toBeDefined()
  })

  test('Creating a blog without likes field has 0 likes', async () => {
    const blogWithoutLikes = {
      title: 'This one has no likes',
      author: 'A sad author',
      url: 'https://utu.fi'
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)

    const results = await (await api.get('/api/blogs'))
    const createdBlog = results.body.find(item => item.title === blogWithoutLikes.title)
    // Check we can find the created blog
    expect(createdBlog.likes).toBe(0)
  })

  test('Creating a blog without a URL fails', async () => {
    const blogWithoutUrl = {
      title: 'This one has no URL',
      author: 'An offline author',
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })
})
