const mongoose = require('mongoose')
const supertest = require('supertest')

describe('Test router paths', () => {
    const app = require('../app')
    const api = supertest(app)
    const Blog = require('../models/Blog')
    const testBlogs = [
        { "title": "testTitle", "author": "testAuthor", "url": "testUrl", "likes": 4 },
        { "title": "Patriot Games", "author": "Tom Clancy", "url": "not yet added", "likes": 9000 },
        { "title": "The Hobbit", "author": "Tolkien", "url": "add url here", "likes": 9002 }
    ]
    const otherTestBlogs = [
        { "title": "Harry Potter 3", "author": "Rowling", "url": "harrypotterbooks", "likes": 5000 },
        { "title": "Blog", "author": "blogger", "url": "blogsite", "likes": 0 }
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

    test('id is correcly defined', async () => {
        const res = await api.get(blogsUrl)
            .expect(200)

        res.body.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).not.toBeDefined()
        })
    })

    test('blog can be added', async () => {
        await Blog
            .find({})
            .then(blogsInDB => expect(blogsInDB.length).toEqual(3))
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[0])
        await Blog
            .find({})
            .then(blogsInDB => expect(blogsInDB.length).toEqual(4))
        await Blog
            .find({ "author": "Rowling" })
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[1])
        await Blog
            .find({})
            .then(blogsInDB => expect(blogsInDB.length).toEqual(5))
        await Blog
            .find({ "url": "blogsite" })
    })

    afterAll(() => mongoose.connection.close())
})