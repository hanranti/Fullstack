const Blog = require('../models/Blog')

const findAllBlogs = async () => {
    let blogs = []
    await Blog
        .find({})
        .then(blogsInDB => {
            blogs = blogsInDB
        })
    return blogs
}

const createBlog = async body => {
    body.likes = body.likes ? body.likes : 0
    const blog = new Blog(body)
    let createdBlog = {}

    await blog
        .save()
        .then(result => {
            createdBlog = result
        })
    return createdBlog
}

const deleteBlog = async id => {
    let deletedBlog
    await Blog.findByIdAndRemove(id).then(blog => deletedBlog = blog)
    return deletedBlog
}

module.exports = {
    findAllBlogs,
    createBlog,
    deleteBlog
}