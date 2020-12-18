const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
})

test('there is correct amount of blogs', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier of returned blogs is id', async () => {
    const res = await api.get('/api/blogs')

    res.body.forEach(blog => expect(blog.id).toBeDefinied)
})

test('a blog can be added', async () => {
    const newBlog = {
        title: 'Agile Software Guide',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/agile.html',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Agile Software Guide')
})


afterAll(() => {
    mongoose.connection.close()
})