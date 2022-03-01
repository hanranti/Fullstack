const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'CastError':
            return res.status(400).send({ error: 'malformed id'})
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

module.exports = {
    unknownEndpoint,
    errorHandler
}