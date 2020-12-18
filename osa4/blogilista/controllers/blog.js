const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

router.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()

    response.json(savedBlog)
})

module.exports = router