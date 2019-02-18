const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: 'Testi1',
        author: 'meitsi',
        url: 'helsinki.fi',
        likes: 15
    },
    {
        title: 'Maria',
        author: 'hän',
        url: 'tampere.fi',
        likes: 10
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}