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

test('a valid blog can be added', async () => {
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

test('if likes is undefinied, it will be 0', async () => {
    const newBlog = {
        title: 'Refactoring',
        author: 'Martin Fowler',
        url: 'https://refactoring.com/'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === 'Refactoring')

    expect(addedBlog.likes).toBe(0)
})

test('blog without title can\'t be added', async () => {
    const newBlog = {
        url: 'https://refactoring.com/',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url can\'t be added', async () => {
    const newBlog = {
        title: 'Refactoring',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})