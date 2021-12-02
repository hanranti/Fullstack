const mongoose = require('mongoose')
const supertest = require('supertest')

describe('test users router paths', () => {
    const app = require('../app')
    const api = supertest(app)
    const User = require('../models/User')
    const testUsers = [
        {
            name: "Bruce Campbell",
            username: "Ash",
            passwordHash: "qwerty"
        }, {
            name: "testUser1",
            username: "test1",
            passwordHash: "fhdoiusiodffdih"
        }, {
            name: "testUser2",
            username: "test2",
            passwordHash: "fdufhdsufdshufdsufhqwe9q979"
        }
    ]

    const testUsersWithoutPasswordHash = testUsers.map(({ passwordHash, ...rest }) => rest)

    const usersUrl = '/api/users'

    const findUsers = async args => await User.find({ args }).exec()

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(testUsers)
    })

    test('get users return correct users and amount', async () => {
        const res = await api.get(usersUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const resWithoutId = res.body.map(({ id, ...rest }) => rest)
        expect(resWithoutId).toHaveLength(3)
        expect(resWithoutId[0]).toEqual(testUsersWithoutPasswordHash[0])
        expect(resWithoutId[1]).toEqual(testUsersWithoutPasswordHash[1])
        expect(resWithoutId[2]).toEqual(testUsersWithoutPasswordHash[2])
    })

    test('post user adds user', async () => {
        const user = {
            name: 'noName',
            username: 'noName',
            password: 'newPassword'
        }
        const res = await api.post(usersUrl)
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(res.body).toEqual({ created: true })
        const users = await findUsers({})
        expect(users.length).toBe(4)
        expect(users[3].name).toBe(user.name)
        expect(users[3].username).toBe(user.username)
        expect(users[3].password).not.toBeDefined()
        expect(users[3].passwordHash).toBeDefined()
    })

    test('user with existing username cannot be added', async () => {
        const res = await api.post(usersUrl)
            .send(testUsersWithoutPasswordHash[0])
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body).toEqual({ error: "username exists" })
        const users = await findUsers({})
        expect(users.length).toBe(3)
    })

    afterAll(() => mongoose.connection.close())
})