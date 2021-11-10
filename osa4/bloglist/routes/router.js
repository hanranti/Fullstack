const router = require('express').Router()
const controller = require('../controllers/controller')

router.get('/', async (req, res) => {
    res.json(await controller.findAllBlogs())
})

router.post('/', async (req, res) => {
    res.status(201).json(await controller.createBlog(req.body))
})

module.exports = router