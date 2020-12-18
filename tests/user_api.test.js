const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe('User creation', () => {
  test('Password must be at least 3 characters', async () => {
    const faultyUser =   {
      'username': 'jakkara',
      'password': '12',
      'name': 'Jali Rainio'
    }
    await api
      .post('/api/users')
      .send(faultyUser)
      .expect(400)
  })
  test('Users must have unique usernames', async () => {
    const user1 =   {
      'username': 'original-user',
      'password': '123',
      'name': 'Test'
    }
    const user2 =   {
      'username': 'original-user',
      'password': '321',
      'name': 'Other Test'
    }
    await api
      .post('/api/users')
      .send(user1)
      .expect(201)

    await api
      .post('/api/users')
      .send(user2)
      .expect(400)
  })
})
