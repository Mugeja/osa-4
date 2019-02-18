const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const emptyList = []

    const multipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '187276346273dhsdh',
            title: 'Kikka kakka',
            author: 'Dixxa d',
            url: 'oma pää',
            likes: 2,
            __v: 0
        },
        {
            _id: '2938476+9sdr8662',
            title: 'osma on kakke',
            author: 'osma',
            url: 'housun savet',
            likes: 453,
            __v: 0
        }
    ]
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list is empty equals to 0', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('when list has multiple blogs equals to their sum', () => {
        const result = listHelper.totalLikes(multipleBlogs)
        expect(result).toBe(460)
    })

    afterAll(() => {
        mongoose.connection.close()
    })



})

describe('Favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const emptyList = []

    const multipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '187276346273dhsdh',
            title: 'Kikka kakka',
            author: 'Dixxa d',
            url: 'oma pää',
            likes: 2,
            __v: 0
        },
        {
            _id: '2938476+9sdr8662',
            title: 'osma on kakke',
            author: 'osma',
            url: 'housun savet',
            likes: 453,
            __v: 0
        }
    ]

    test('blog with most likes with multiple blogs', () => {
        const result = listHelper.favoriteBlog(multipleBlogs)
        expect(result).toEqual({
            _id: '2938476+9sdr8662',
            title: 'osma on kakke',
            author: 'osma',
            url: 'housun savet',
            likes: 453,
            __v: 0
        })
    })

    test('blog with most likes with multiple blogs', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        })
    })

    test('blog with most likes with empty list', () => {
        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual(undefined)
    })
})

