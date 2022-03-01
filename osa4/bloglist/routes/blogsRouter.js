const router = require('express').Router()
const blogsController = require('../controllers/blogsController')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    return authorization && authorization.toLowerCase().startsWith('bearer ')
        ? authorization.substring(7)
        : null
}

const validateToken = async req => {
    const token = getTokenFrom(req)
    const decodedToken = token !== null ? jwt.verify(token, process.env.SECRET) : false
    return !token || !decodedToken.id ? false : await User.findById(decodedToken.id)
}

router.get('/', async (req, res) => {
    res.json(await blogsController.findAllBlogs())
})

router.post('/', async (req, res) => {
    const user = await validateToken(req)
    user
        ? req.body.title && req.body.url
            ? res.status(201).json(await blogsController.createBlog(req.body, user))
            : res.status(400).send({ message: 'bad request' })
        : res.status(401).json({ error: 'Token not valid!' })
})

router.delete('/:id', async (req, res) => {
    const user = await validateToken(req)
    if (user) {
        const deletedBlog = await blogsController.deleteBlog(req.params.id, user)
        deletedBlog
            ? res.status(204).send({ message: "deleted" })
            : res.status(400).send({ message: "id not found" })
    } else {
        res.status(401).json({ error: 'Token not valid!' })
    }
})

router.put('/:id', async (req, res) => {
    const user = await validateToken(req)
    if (user) {
        const updatedBlog = await blogsController.updateBlog(req.params.id, req.body, { new: true }, user)
        res.status(200).json(updatedBlog)
    } else {
        res.status(401).json({ error: 'Token not valid!' })
    }
})

module.exports = router