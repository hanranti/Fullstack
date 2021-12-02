const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.get('/', async (req, res) => {
    res.status(200).json(await usersController.findAllUsers())
})

router.post('/', async (req, res) => {
    const error = await usersController.createUser(req.body)

    !error
        ? res.status(201).json({ created: true })
        : res.status(400).json(error)
})

module.exports = router