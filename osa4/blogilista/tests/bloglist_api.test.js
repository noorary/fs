const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.insertMany(helper.initialUsers)

    const user = await helper.oneUserInDb()
    const blogs = await helper.blogsInDb()

    user.blogs = blogs.map(b => b._id)

    user.save()
    await Blog.updateMany({}, { $set: { user: user._id } })
})

describe('when there are some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there is correct amount of blogs', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(b => b.title)
        expect(titles).toContain('Go To Statement Considered Harmful')
    })

    test('identifier of returned blogs is id', async () => {
        const res = await api.get('/api/blogs')

        res.body.forEach(blog => expect(blog.id).toBeDefinied)
    })
})

describe('adding new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'Agile Software Guide',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/agile.html',
            likes: 1
        }
        const token = await helper.getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('Agile Software Guide')
    })

    test('without definied likes, likes will be 0', async () => {
        const newBlog = {
            title: 'Refactoring',
            author: 'Martin Fowler',
            url: 'https://refactoring.com/'
        }

        const token = await helper.getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)

        const response = await api.get('/api/blogs')
        const addedBlog = response.body.find(blog => blog.title === 'Refactoring')

        expect(addedBlog.likes).toBe(0)
    })

    test('without title fails with status code 400', async () => {
        const newBlog = {
            url: 'https://refactoring.com/',
            likes: 10
        }

        const token = await helper.getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('without url fails with statuscode 400c', async () => {
        const newBlog = {
            title: 'Refactoring',
            likes: 1
        }

        const token = await helper.getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting blog', () => {
    test('with valid id succeeds with status code 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating blog', () => {

    test('succeeds with valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newUpdatedBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 8
        }

        const resultBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newUpdatedBlog)
            .expect(200)

        expect(resultBlog.body.likes).toBe(8)


    })
})

afterAll(() => {
    mongoose.connection.close()
})