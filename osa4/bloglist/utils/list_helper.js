const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)

const favoriteBlog = blogs => blogs.length > 0 ? blogs[blogs.map(blog => blog.likes).indexOf(Math.max(...blogs.map(blog => blog.likes)))] : null

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}