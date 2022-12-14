const Book = require('../models/Book')

module.exports = {
    getBooks: async (req,res)=>{
        console.log(req.user)
        try{
            const bookItems = await Book.find({userId:req.user.id})
            const booksAvailable = await Book.countDocuments({userId:req.user.id, checkedOut: false})
            res.render('books.ejs', {books: bookItems, available: booksAvailable, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBook: async (req, res)=>{
        try{
            await Book.create({ title: req.body.bookItem,
                                author: req.body.bookAuthor,
                                description: req.body.bookDescription,
                                subjects: req.body.bookSubjects,
                                notes: req.body.bookNotes,
                                checkedOut: false,
                                userId: req.user.id})
            console.log('Book has been added!')
            res.redirect('/books')
        }catch(err){
            console.log(err)
        }
    },
    markCheckedOut: async (req, res)=>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                checkedOut: true
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
                checkedOut: false
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
