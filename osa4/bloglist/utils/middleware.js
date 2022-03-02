const jwt = require('jsonwebtoken')
const User = require('../models/User')

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'CastError':
            return res.status(400).send({ error: 'malformed id' })
        case 'ValidationError':
            return res.status(400).json({ error: error.message })
        case 'TokenExpiredError':
            return res.status(401).json({ error: 'token expired' })
        case 'JsonWebTokenError':
            return res.status(401).json({ error: 'invalid token' })
        default:
            next(err)
    }
}

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

const tokenExtractor = (req, res, next) => {
    req.token = getTokenFrom(req)
    next()
}

const userExtractor = async (req, res, next) => {
    req.user = await validateToken(req)
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}