const Blog = require('../models/Blog')

const findAllBlogs = async () => {
    const blogs = await Blog.find({}).exec()
    return blogs
}

const createBlog = async body => {
    body.likes = body.likes ? body.likes : 0
    const blog = new Blog(body)
    await blog.save()
    return blog
}

const deleteBlog = async id => {
    const deletedBlog = await Blog.findByIdAndRemove(id).exec()
    return deletedBlog
}

const updateBlog = async (id, blog, options) => {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, options).exec()
    return updatedBlog
}

module.exports = {
    findAllBlogs,
    createBlog,
    deleteBlog,
    updateBlog
}