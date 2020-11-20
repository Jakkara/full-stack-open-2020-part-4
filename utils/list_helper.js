const _ = require('lodash')

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length < 1) {
    return {}
  }
  const sorted = blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
  return sorted[0]
}

const mostBlogs = blogs => {
  if (blogs.length < 1) {
    return {}
  }
  const blogsByAuthor = {}
  blogs.forEach(blog => {
    const author = blog.author
    if (author in blogsByAuthor) {
      blogsByAuthor[author] += 1
    } else {
      blogsByAuthor[author] = 1
    }
  })
  const maxKey = _.maxBy(_.keys(blogsByAuthor), key => blogsByAuthor[key])
  return {
    author: maxKey,
    blogs: blogsByAuthor[maxKey]
  }
}

const mostLikes = blogs => {
  if (blogs.length < 1) {
    return {}
  }
  const likesByAuthor = {}
  blogs.forEach(blog => {
    const author = blog.author
    if (author in likesByAuthor) {
      likesByAuthor[author] += blog.likes
    } else {
      likesByAuthor[author] = blog.likes
    }
  })
  const maxKey = _.maxBy(_.keys(likesByAuthor), key => likesByAuthor[key])
  return {
    author: maxKey,
    likes: likesByAuthor[maxKey]
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
