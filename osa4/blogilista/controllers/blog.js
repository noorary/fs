const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

router.post('/', async (request, response) => {
    console.log(request.token)
    const blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)


    if(request.body.likes === undefined) {
        blog.likes = 0
    }

    if(request.body.title === undefined || request.body.url === undefined) {
        response.status(400).end()
    } else {
        blog.user = user
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog)
    }
})

router.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

router.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)
})

module.exports = router