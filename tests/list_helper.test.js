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
