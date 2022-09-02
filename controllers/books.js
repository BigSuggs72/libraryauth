const Book = require('../models/Book')

module.exports = {
    getBooks: async (req,res)=>{
        console.log(req.user)
        try{
            const bookItems = await Book.find({userId:req.user.id}).sort({completed: 'asc'})
            const booksLeft = await Book.countDocuments({userId:req.user.id,completed: false})
            const booksRead = await Book.countDocuments({userId:req.user.id,completed: true})
            res.render('books.ejs', {books: bookItems, read: booksRead, left: booksLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBook: async (req, res)=>{
        try{
            await Book.create({book: req.body.bookItem, bookAuthor: req.body.bookAuthor, bookGenre: req.body.bookGenre, completed: false, userId: req.user.id})
            console.log('Book has been added!')
            res.redirect('/books')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteBook: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Book.findOneAndDelete({_id:req.body.bookIdFromJSFile})
            console.log('Deleted Book')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}
