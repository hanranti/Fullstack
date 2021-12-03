const User = require('../models/User')
const bcrypt = require('bcrypt')
const { response } = require('../app')

const findAllUsers = async () => {
    const users = (await User.find({}).exec()).map(user => ({
        name: user.name,
        username: user.username,
        id: user.id
    }))
    return users
}

const createUser = async body => {
    const error = (await User.find({ username: body.username }).exec()).length > 0
        ? { errors: ["username already in use"] }
        : !body.username
            ? { errors: ["username must be provided"] }
            : body.username.length < 3
                ? { errors: ["username must be 3 or more characters long"] }
                : { errors: [] }
    !body.password
        ? error.errors.push("password must be provided")
        : body.password.length < 3
            ? error.errors.push("password must be 3 or more characters long")
            : false

    if (error.errors.length > 0) {
        return error
    } else {
        const passwordHash = await bcrypt.hash(body.password, 15)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        await user.save()
    }
}

module.exports = {
    findAllUsers,
    createUser
}