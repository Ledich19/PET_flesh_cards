require('dotenv').config()
const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  word: {
    type: String,
    minLength: 2,
    required: true,
  },
  transcription: String,
  translation: String,
  learned: Boolean,
  examples: [],
  repetitions: [],
  img: String,
  colection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colection',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const newReturnedObject = returnedObject
    newReturnedObject.id = returnedObject._id.toString()
    delete newReturnedObject._id
    delete newReturnedObject.__v
  },
})

module.exports = mongoose.model('Card', cardSchema)
