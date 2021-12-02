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
        ? { error: "username exists" }
        : false

    if (error) {
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