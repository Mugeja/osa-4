const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('Two blog database', async () => {
    beforeEach(async () => {
        await Blog.remove({})

        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs returned', async () => {
        const response = await helper.blogsInDb()

        expect(response.length).toBe(helper.initialBlogs.length)
    })

    test('blogs have id not _id', async () => {
        const blogs = await helper.blogsInDb()
        const firstBlog = blogs[0]

        expect(firstBlog.id).toBeDefined()
    })

    test('Posting works ', async () => {
        const newBlog = {
            title: 'Testiblogi',
            author: 'Eetuboii',
            url: 'helsinki at fi',
            likes: 312
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)

    })
    test('no likes means 0 likes', async () => {
        const newBlog = {
            title: 'I get no likes :(',
            author: 'RoniBoii',
            url: 'roskis',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost.map(l => l.likes)).toEqual([15, 10, 0])
    })

    test('no url or title', async () => {
        const newBlog = {
            author: 'RoniBoii',
            url: 'roskis',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
        expect(400)
    })

    test('delete (first) works', async () => {
        const startingDB = await helper.blogsInDb()
        const startingLength = startingDB.length
        const deleteId = startingDB[0].id

        await api
            .delete(`/api/blogs/${deleteId}`)
            .expect(204)

        const endLength = (await helper.blogsInDb()).length
        expect(endLength).toBe(startingLength - 1)
    })

    test('update blog', async () => {
        const db = await helper.blogsInDb()
        const blogToBeUpdated = db[0]

        const updatedBlog = {
            title: 'Testi1',
            author: 'meitsi',
            url: 'helsinki.fi',
            likes: 1221
        }

        const res = await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(res.body.likes).toBe(updatedBlog.likes)
    })
})
describe('when there is initially one user at db', async () => {
    beforeEach(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
 
})

afterAll(() => {
    mongoose.connection.close()
})
