const router = require('express').Router()
const usersController = require('../controllers/usersController')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    res.status(200).json(await usersController.findAllUsers())
})

router.post('/', async (req, res) => {
    const error = req.body.username === 'login' ? { error: 'Username not allowed!' } : await usersController.createUser(req.body)

    !error
        ? res.status(201).json({ created: true })
        : res.status(400).json(error)
})

router.post('/login', async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username })

    const passwordCorrect = existingUser === null
        ? false
        : await bcrypt.compare(req.body.password, existingUser.passwordHash)

    if (!(existingUser && passwordCorrect)) {
        return res.status(401).json({
            error: "Either username or password was not correct!"
        })
    }

    const userForToken = {
        username: existingUser.username,
        id: existingUser.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

    res.status(200).send({ token, username: existingUser.username, name: existingUser.name })
})

module.exports = router