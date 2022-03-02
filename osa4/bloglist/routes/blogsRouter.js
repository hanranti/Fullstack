const router = require('express').Router()
const blogsController = require('../controllers/blogsController')

router.get('/', async (req, res) => {
    res.json(await blogsController.findAllBlogs())
})

router.post('/', async (req, res) => {
    const user = req.user
    console.log(user)
    user
        ? req.body.title && req.body.url
            ? res.status(201).json(await blogsController.createBlog(req.body, user))
            : res.status(400).send({ message: 'bad request' })
        : res.status(401).json({ error: 'Token not valid!' })
})

router.delete('/:id', async (req, res) => {
    const user = req.user
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
    const user = req.user
    if (user) {
        const updatedBlog = await blogsController.updateBlog(req.params.id, req.body, { new: true }, user)
        res.status(200).json(updatedBlog)
    } else {
        res.status(401).json({ error: 'Token not valid!' })
    }
})

module.exports = router