const mongoose = require('mongoose')
const supertest = require('supertest')

describe('Test router paths', () => {
    const app = require('../app')
    const api = supertest(app)
    const Blog = require('../models/Blog')
    const testBlogs = [
        {"_id":"619dfd044cbf556409ac1e44","title":"testTitle","author":"testAuthor","url":"testUrl","likes":4},
        {"_id":"619dfd594cbf556409ac1e45","title":"Patriot Games","author":"Tom Clancy","url":"not yet added","likes":9000},
        {"_id":"619dfd934cbf556409ac1e46","title":"The Hobbit","author":"Tolkien","url":"add url here","likes":9002}
    ]

    const blogsUrl = '/api/blogs'

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(testBlogs)
    })

    test('get blogs returns json with correct length', async () => {
        const res = await api.get(blogsUrl)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(res.body).toHaveLength(3)
    })

    afterAll(() => mongoose.connection.close())
})