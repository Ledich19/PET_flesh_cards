const express = require('express')
const app = express()
app.use(express.json())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

let cards = [{
    word: "word",
    transcription: 'transcription',
    translation: "translation",
    learned: true,
    examples: ["exampbles", "hngxbxbg  ynvym"],
    colection: {
      name: 'numbers',
      id: '23534морлю534'
    },
    repetitions: [{
      isItRight: true,
      data: '33ew',
    }],
    id: 1165751,
    img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
  },
  {
    word: "word2",
    transcription: 'transcription',
    translation: "слово",
    learned: true,
    examples: ["examples", "hngbg  ynvym"],
    colection: {
      name: 'numbers',
      id: '23534иолю534'
    },
    repetitions: [{
      isItRight: true,
      data: '33ew',
    }],
    id: 6576111,
    img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
  },
  {
    word: "word3",
    transcription: 'transcription',
    translation: "слово",
    learned: true,
    examples: ["examples", "hngbg  ynvym"],
    colection: {
      name: 'numbers',
      id: '235348534'
    },
    repetitions: [{
      isItRight: true,
      data: '33ew',
    }],
    id: 157511,
    img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
  },
  {
    word: "word4",
    transcription: 'transcription',
    translation: "слово",
    learned: true,
    examples: ["examples", "hngbg  ynvym"],
    colection: {
      name: 'numbers',
      id: '235п34534'
    },
    repetitions: [{
      isItRight: true,
      data: '33ew',
    }],
    id: 115751,
    img: 'https://image.shutterstock.com/image-vector/design-concept-word-english-website-260nw-1043962963.jpg',
  }
  ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/cards', (request, response) => {
    response.json(cards)
  })
  
  app.get('/cards/:id', (request, response) => {
    const id = Number(request.params.id)
    const card = cards.find(card => card.id === id)

    if (card) {
        response.json(card)
    } else {
        response.status(404).end
    }
  })
  app.post('/cards', (request, response) => {
    const card = request.body
    console.log(card)
    response.json(card)
  })

  app.delete('/cards/:id', (request, response) => {
    const id = Number(request.params.id)
    cards = cards.filter(card => card.id !== id)
  
    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)