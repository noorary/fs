const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    if(blogs.length === 0) {
        return '{ }'
    }

    const favorite = blogs
        .reduce((currentFavorite, blog) => (blog.likes > currentFavorite.likes ? blog : currentFavorite))

    return (
        {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    )
}

const mostBlogs = (blogs) => {

    const countByAuthor = _.countBy(blogs, 'author')

    const sortedBlogs = _.chain(countByAuthor)
        .map((blogs, author) => {
            return {
                author: author,
                blogs: blogs
            }
        }).sortBy('blogs').value()

    const mostBloggingAuthor = sortedBlogs.reduce((current, author) => (author.blogs > current.blogs ? author : current))

    return mostBloggingAuthor

}

const mostLikes = (blogs) => {

    const likesByAuthor = []

    const blogsByAuthor = _.groupBy(blogs, 'author')
    Object.keys(blogsByAuthor).forEach((key) => {
        likesByAuthor.push({
            author: key,
            likes: blogsByAuthor[key].reduce((total, blog) => (total += blog.likes), 0)
        })
    })

    const result = likesByAuthor.reduce((current, author) => (author.likes > current.likes ? author : current))

    return result

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}