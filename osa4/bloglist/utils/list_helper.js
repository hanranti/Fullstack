const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)

const favoriteBlog = blogs => blogs[blogs.map(blog => blog.likes).indexOf(Math.max(...blogs.map(blog => blog.likes)))]

const blogAmountsByAuthor = blogs => blogs.reduce((allAmounts, currentBlog) => {
    allAmounts.find(authorBlogs => authorBlogs.author === currentBlog.author)['blogs']++
    return allAmounts
},
 _.uniq(blogs.map(blog => blog.author)).map(author => ({author: author, blogs: 0})))

const mostBlogs = blogs => _.maxBy(blogAmountsByAuthor(blogs), authorBlogs => authorBlogs.blogs)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}