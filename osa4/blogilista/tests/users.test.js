const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creating new user succeeds with unique username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'kayttaja',
            name: 'Perus Kayttaja',
            password: 'maitolaatikko'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message is username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainensana'
        }

        const result = await api
            .post('/api/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pbm5pIiwiaWQiOiI1ZmRmN2QzZTViNjk3ZDFmODJiMWEyZjciLCJpYXQiOjE2MDg0ODMxNjJ9.xhR5SgY6iGEphJLJBRJSTUA-MTVS8HUw1fSbFtWEazY')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creating new user fails with proper status code and message if username is shorter than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ei',
            name: 'Ei Oo',
            password: 'salainensana'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('shorter than the minimum allowed lengt')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('creating new user fails with proper status code and message if password is shorter than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'sammie',
            name: 'Sam Samson',
            password: '12'
        }

        const response = await api.post('/api/users').send(newUser)
        console.log(response.body)
        expect(response.body.error).toContain('password must be at least 3 charachters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })
})

afterAll(() => {
    mongoose.connection.close()
})