const router = require('express').Router()
const controller = require('../controllers/controller')

router.get('/', async (req, res) => {
    res.json(await controller.findAllBlogs())
})

router.post('/', async (req, res) => {
    req.body.title && req.body.url
        ? res.status(201).json(await controller.createBlog(req.body))
        : res.status(400).send({ message: 'bad request' })
})

router.delete('/:id', async (req, res) => {
    const deletedBlog = await controller.deleteBlog(req.params.id)
    deletedBlog
        ? res.status(204).send({message: "deleted"})
        : res.status(400).send({ message: "id not found" })
})

router.put('/:id', async (req, res) => {
    const updatedBlog = await controller.updateBlog(req.params.id, req.body, {new: true})
    res.status(200).json(updatedBlog)
})

module.exports = router