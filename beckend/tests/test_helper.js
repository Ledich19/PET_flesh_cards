const Card = require('../models/card')

const initialCard = [{
  word: 'one',
  transcription: '[one]',
  translation: 'один',
  learned: true,
  examples: ['one number', 'one person'],
  colection: ['11111111111111111', '2222222222222222'],
  repetitions: [{
    isItRight: true,
    data: new Date(),
  }],
  img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
}, {
  word: 'two',
  transcription: '[two]',
  translation: 'один',
  learned: true,
  examples: ['two number', 'two person'],
  colection: ['11111111111111111', '2222222222222222'],
  repetitions: [{
    isItRight: true,
    data: new Date(),
  }],
  img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
}]

const nonExistingId = async () => {
  const cardForRemove = {
    word: 'remove',
    transcription: '[remove]',
    translation: 'remove',
    learned: true,
    examples: ['remove', 'remove'],
    colection: ['remove', 'remove'],
    repetitions: [{
      isItRight: true,
      data: new Date(),
    }],
    img: 'remove',
  }
  const card = new Card(cardForRemove)
  await card.save()
  await card.remove()
  return card._id.toString()
}

const cardsInDb = async () => {
  const notes = await Card.find({})
  return notes.map((card) => card.toJSON())
}

module.exports = {
  initialCard, nonExistingId, cardsInDb,
}
