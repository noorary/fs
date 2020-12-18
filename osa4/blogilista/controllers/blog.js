const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

router.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(request.body.likes === undefined) {
        blog.likes = 0
    }

    if(request.body.title === undefined || request.body.url === undefined) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.json(savedBlog)
    }
})

module.exports = router