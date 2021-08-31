const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./test_helper')
const Card = require('../models/card')

const api = supertest(app)

beforeEach(async () => {
  await Card.deleteMany({})
  console.log('cleared')

  const cardObjects = helper.initialCards.map((card) => new Card(card))
  const promiseArray = cardObjects.map((card) => card.save())
  await Promise.all(promiseArray)
  console.log('done')
})

describe('when there is initially some Cards saved', () => {
  test('card can be update', async () => {
    const cardsAtStart = await helper.cardsInDb()
    const cardToUpdate = cardsAtStart[0]
    const cardEdit = {
      word: 'update',
      transcription: '[update]',
      translation: 'update',
      learned: true,
      examples: ['update', 'update'],
      colection: ['update', 'update'],
      repetitions: [{
        isItRight: true,
        data: new Date(),
      }],
      img: 'update',
    }
    await api.put(`/cards/${cardToUpdate.id}`)
      .send(cardEdit)
      .expect(200)
    const cardsAtEnd = await helper.cardsInDb()

    expect(cardsAtEnd[0].word).toContain(
      'update',
    )
  })
})

test('notes are returned as json', async () => {
  await api
    .get('/cards')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two cards', async () => {
  const response = await api.get('/cards')

  expect(response.body).toHaveLength(helper.initialCards.length)
})

test('the first card is one', async () => {
  const response = await api.get('/cards')

  const words = response.body.map((r) => r.word)
  expect(words).toContain(
    'one',
  )
})

test('a valid card can be added', async () => {
  const newCard = {
    word: 'three',
    transcription: '[three]',
    translation: 'три',
    learned: true,
    examples: ['three number', 'three person'],
    colection: ['11111111111111111', '2222222222222222'],
    repetitions: [{
      isItRight: true,
      data: new Date(),
    }],
    img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
  }

  await api
    .post('/cards')
    .send(newCard)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const cardsAtEnd = await helper.cardsInDb()
  expect(cardsAtEnd).toHaveLength(helper.initialCards.length + 1)

  const words = cardsAtEnd.map((c) => c.word)

  expect(words).toContain(
    'three',
  )
})

test('card without content is not added', async () => {
  const newCard = {
    word: 'three',
    transcription: '[three]',
    translation: 'три',
    learned: true,
    examples: ['three number', 'three person'],
    colection: ['11111111111111111', '2222222222222222'],
    repetitions: [{
      isItRight: true,
      data: new Date(),
    }],
    img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
  }

  await api
    .post('/cards')
    .send(newCard)
    .expect(400)

  const cardsAtEnd = await helper.cardsInDb()

  expect(cardsAtEnd).toHaveLength(helper.initialCards.length)
})

test('a specific card can be viewed', async () => {
  const cardsStart = await helper.cardsInDb()

  const cardToView = cardsStart[0]

  const resultCard = await api
    .get(`/cards/${cardToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedCardToView = JSON.parse(JSON.stringify(cardToView))

  expect(resultCard.body).toEqual(processedCardToView)
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const cardsAtStart = await helper.cardsInDb()
    const cardToDelete = cardsAtStart[0]

    await api
      .delete(`/cards/${cardToDelete.id}`)
      .expect(204)

    const cardsAtEnd = await helper.cardsInDb()

    expect(cardsAtEnd).toHaveLength(
      helper.initialCards.length - 1,
    )

    const words = cardsAtEnd.map((c) => c.word)

    expect(words).not.toContain(cardToDelete.word)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
