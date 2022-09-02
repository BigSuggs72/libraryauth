const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  }, 
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  subjects: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  checkedout: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.model('Book', BookSchema, 'books')