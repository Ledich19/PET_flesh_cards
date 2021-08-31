require('dotenv').config()
const mongoose = require('mongoose')

const colectionSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

colectionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const newReturnedObject = returnedObject
    newReturnedObject.id = returnedObject._id.toString()
    delete newReturnedObject._id
    delete newReturnedObject.__v
  },
})

module.exports = mongoose.model('Colection', colectionSchema)
