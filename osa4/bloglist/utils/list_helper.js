const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)

module.exports = {
    dummy,
    totalLikes
}