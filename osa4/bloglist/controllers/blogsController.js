const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const findAllBlogs = async () => {
    const blogs = (await Blog.find({}).exec())

    const promisedBlogs = await Promise.all(blogs.map(async blog => ({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: await User.findById(blog.user).select('-blogs')
    })))

    return promisedBlogs
}

const createBlog = async (body, user) => {
    body.likes = body.likes ? body.likes : 0

    const blog = new Blog({
        user: user,
        ...body
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    return savedBlog
}

const deleteBlog = async (id, user) => {
    let blogToDelete = await Blog.findById(id).exec()
    if (user.equals(blogToDelete.user)) {
        user.blogs = user.blogs.map(b => {
            return b.equals(blogToDelete)
                ? null
                : b
        })
        blogToDelete = await Blog.findByIdAndRemove(id).exec()
    }
    return blogToDelete
}

const updateBlog = async (id, blog, options, user) => {
    let blogToUpdate = await Blog.findById(id).exec()
    let blogUser = await User.findOne({ blogs: { '$in': [blogToUpdate] } }).exec()
    console.log(user.equals(blogUser))
    if (user.equals(blogUser)) {
        blogToUpdate = await Blog.findByIdAndUpdate(id, blog, options).exec()
        blogUser.blogs = blogUser.blogs.map(b => {
            console.log('b', b)
            console.log('blogToUpdate', blogToUpdate.id)
            console.log(b.equals(blogToUpdate.id))
            return b.equals(blogToUpdate)
                ? blogToUpdate
                : b
        })
        blogUser.save()
    }
    return blogToUpdate
}

module.exports = {
    findAllBlogs,
    createBlog,
    deleteBlog,
    updateBlog
}