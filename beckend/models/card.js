require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

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
  colection: [],
  repetitions: [],
  img: String,
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
