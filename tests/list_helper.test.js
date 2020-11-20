const listHelper = require('../utils/list_helper')

describe('Total likes', () => {

  const firstBlog = {
    _id: 'abcdef123567',
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 10,
    __v: 0
  }

  const otherBlog = {
    _id: '7654321bcdef',
    title: 'Harry Potter 2: Here I go again',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 40,
    __v: 0
  }

  test('List of one blog returns the count of its likes', () => {
    const result = listHelper.totalLikes([firstBlog])
    expect(result).toBe(10)
  })

  test('Empty list has 0 likes', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('Multiple items on list returns total sum of likes', () => {
    const result = listHelper.totalLikes([firstBlog, otherBlog])
    expect(result).toBe(50)
  })
})

describe('Favorite blog', () => {

  const firstBlog = {
    _id: 'abcdef123567',
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 10,
    __v: 0
  }

  const otherBlog = {
    _id: '7654321bcdef',
    title: 'Harry Potter 2: Here I go again',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 40,
    __v: 0
  }

  const thirdBlog = {
    _id: '765432dsada1bcdef',
    title: 'Harry Potter 3: Return of the King',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 40,
    __v: 0
  }

  test('List of one blog returns that blog', () => {
    const result = listHelper.favoriteBlog([firstBlog])
    expect(result).toBe(firstBlog)
  })

  test('Empty list returns empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('Multiple items on list returns the one with most likes', () => {
    const result = listHelper.favoriteBlog([firstBlog, otherBlog])
    expect(result).toBe(otherBlog)
  })

  test('Multiple items with equal likes return one of them', () => {
    const result = listHelper.favoriteBlog([firstBlog, otherBlog, thirdBlog])
    expect(result.likes).toBe(40)
  })
})

const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

describe('Author with most blogs', () => {
  test('Empty list returns empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
  test('Given a list of blogs, return the author with most blogs and count of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})

describe('Author with most likes', () => {
  test('Empty list returns empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
  test('Given a list of blogs, return the author with most likes and count of likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expected)
  })
})
