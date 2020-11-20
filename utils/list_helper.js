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

module.exports = {
  totalLikes,
  favoriteBlog
}
