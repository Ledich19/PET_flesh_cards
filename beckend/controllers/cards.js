const cardsRouter = require('express').Router()
const Card = require('../models/card')

cardsRouter.get('/info', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

cardsRouter.get('/', async (request, response) => {
  const cards = await Card.find({})
  response.json(cards)
})

cardsRouter.get('/:id', (request, response, next) => {
  const {
    id
  } = request.params
  Card.findById(id).then((card) => {
    if (card) {
      response.json(card)
    } else {
      response.status(404).end()
    }
  }).catch((error) => next(error))
})
cardsRouter.post('/', async (request, response, next) => {
  console.log(request.body)
  const {
    body
  } = request

  const card = new Card({
    word: body.word,
    transcription: body.transcription,
    translation: body.translation,
    learned: true,
    img: body.img,
  })
  try {
    const savedCard = await card.save()
    response.json(savedCard)
  } catch (exsption) {
    next(exception)
  }
})

cardsRouter.delete('/:id', (request, response, next) => {
  const {
    id
  } = request.params
  Card.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

cardsRouter.put('/:id', (request, response, next) => {
  const {
    body
  } = request
  const {
    id
  } = request.params

  const card = {
    word: body.word,
    transcription: body.transcription,
    translation: body.translation,
    learned: true,
    img: body.img,
  }

  Card.findByIdAndUpdate(id, card, {
      new: true
    })
    .then((updateCard) => {
      response.json(updateCard)
    })
    .catch((error) => next(error))
})

module.exports = cardsRouter