const listHelper = require('../utils/list_helper')

describe('Total likes', () => {

  const firstBook = {
    _id: 'abcdef123567',
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 10,
    __v: 0
  }

  const otherBook = {
    _id: '7654321bcdef',
    title: 'Harry Potter 2: Here I go again',
    author: 'JK Rowling',
    url: 'https://google.com',
    likes: 40,
    __v: 0
  }

  test('List of one blog returns the count of its likes', () => {
    const result = listHelper.totalLikes([firstBook])
    expect(result).toBe(10)
  })

  test('Empty list has 0 likes', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('Multiple items on list returns total sum of likes', () => {
    const result = listHelper.totalLikes([firstBook, otherBook])
    expect(result).toBe(50)
  })
})
