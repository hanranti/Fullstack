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
        { "title": "Blog", "author": "blogger", "url": "blogsite" },
        { "author": "mr. X", "url": "unadded" },
        { "title": "first blog", "author": "mrs. X" },
        { "author": "noname" }
    ]

    const blogsUrl = '/api/blogs'

    const findBlogs = async args => await Blog
        .find(args)
        .then(blogsInDB => { return blogsInDB })

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
        let blogs = await findBlogs({})
        expect(blogs.length).toEqual(3)
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[0])
        blogs = await findBlogs({})
        expect(blogs.length).toEqual(4)
        expect(blogs[3].title).toEqual(otherTestBlogs[0].title)
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[1])
        blogs = await findBlogs({})
        expect(blogs.length).toEqual(5)
        expect(blogs[4].author).toEqual(otherTestBlogs[1].author)
    })

    test('blog default likes is 0', async () => {
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[1])
        let blogs = await findBlogs({})
        console.log(blogs[3])
        expect(blogs[3].likes).toBeDefined()
        expect(blogs[3].likes).toEqual(0)
    })

    test('blog without title or url cannot be added', async () => {
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[2])
            .expect(400)
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[3])
            .expect(400)
        await api
            .post(blogsUrl)
            .send(otherTestBlogs[4])
            .expect(400)
        let blogs = await findBlogs({})
        expect(blogs.length).toEqual(3)
    })

    afterAll(() => mongoose.connection.close())
})