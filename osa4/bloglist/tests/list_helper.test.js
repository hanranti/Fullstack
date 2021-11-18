const listhelper = require('../utils/list_helper')

test('dummy return one', () => {
    const blogs = []

    const result = listhelper.dummy(blogs)
    expect(result).toBe(1)
})