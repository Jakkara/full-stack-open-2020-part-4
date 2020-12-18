const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs')
  response.json(result)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    response.status(400).send({ error: 'The password must be at least 3 characters' })
    return
  }
  const saltRounds = 5
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (e) {
    response.status(400).send( { error: e.message })
  }
})

module.exports = usersRouter
