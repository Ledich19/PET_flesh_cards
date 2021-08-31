const cardsRouter = require('express').Router()
const Card = require('../models/card')
const User = require('../models/user')

cardsRouter.get('/info', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

cardsRouter.get('/', async (request, response) => {
  const cards = await Card.find({}).populate('user', { username: 1, name: 1 })
  response.json(cards)
})

cardsRouter.get('/:id', async (request, response) => {
  const card = await Card.findById(request.params.id)
  if (card) {
    response.json(card)
  } else {
    response.status(404).end()
  }
})

cardsRouter.post('/', async (request, response) => {
  console.log(request.body)
  const {
    body,
  } = request

  const user = await User.findById(body.userId)

  const card = new Card({
    word: body.word,
    transcription: body.transcription,
    translation: body.translation,
    learned: true,
    img: body.img,
    user: user._id,
  })
  const savedCard = await card.save()
  user.cards = user.cards.concat(savedCard._id)
  user.save()
  response.json(savedCard)
})

cardsRouter.delete('/:id', async (request, response) => {
  const {
    id,
  } = request.params
  await Card.findByIdAndRemove(id)
  response.status(204).end()
})

cardsRouter.put('/:id', async (request, response) => {
  const {
    body,
  } = request
  const {
    id,
  } = request.params

  const card = {
    word: body.word,
    transcription: body.transcription,
    translation: body.translation,
    learned: true,
    img: body.img,
  }
  const updateCard = await Card.findByIdAndUpdate(id, card, {
    new: true,
  })
  response.json(updateCard)
})

module.exports = cardsRouter
