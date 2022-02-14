const Blog = require('../models/Blog')
const User = require('../models/User')

const findAllBlogs = async () => {
    const blogs = (await Blog.find({}).exec())

    const promisedBlogs = await Promise.all(blogs.map(async blog => ({
        title: blog.title,
        author:blog.author,
        url: blog.url,
        likes: blog.likes,
        user: await User.findOne({id: blog.user}).select('-blogs')
    })))

    return promisedBlogs
}

const createBlog = async body => {
    body.likes = body.likes ? body.likes : 0

    const user = await User.findOne({})
    const blog = new Blog({
        user: user.id,
        ...body
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    return savedBlog
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