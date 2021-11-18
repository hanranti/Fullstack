const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)

const favoriteBlog = blogs => blogs[blogs.map(blog => blog.likes).indexOf(Math.max(...blogs.map(blog => blog.likes)))]

const blogDetailsByAuthor = blogs => blogs.reduce((allAmounts, currentBlog) => {
    let authorDetails = allAmounts.find(authorBlogs => authorBlogs.author === currentBlog.author)
    authorDetails['blogs']++
    authorDetails['likes'] += currentBlog.likes
    return allAmounts
},
 _.uniq(blogs.map(blog => blog.author)).map(author => ({author: author, blogs: 0, likes: 0})))

const mostBlogs = blogs => _.maxBy(blogDetailsByAuthor(blogs), authorBlogs => authorBlogs.blogs)

const mostLikes = blogs => _.maxBy(blogDetailsByAuthor(blogs), authorBlogs => authorBlogs.likes)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}