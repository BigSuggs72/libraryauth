const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    subjects: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    checkedout: {
        type: Boolean,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Book', BookSchema, 'books')
