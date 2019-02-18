const dummy = (blogs) => {
   return 1

  }

  const totalLikes = (blogs) => {
    return blogs.reduce((sum, order) => sum + order.likes, 0)
    
}

const favoriteBlog = (blogs) => {
    var i = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > i.likes) {
            i = blog 
        }
    })

    return i

}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
