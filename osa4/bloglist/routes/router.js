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

module.exports = router