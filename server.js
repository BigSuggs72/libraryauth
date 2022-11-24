
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const bookRoutes = require('./routes/books')

require('dotenv').config({path: './config/.env'})
// require('dotenv').config({path: '.env'})


// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Lets you access currentUser in ejs files (to change the navbar links based on whether a user is signed in)
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(flash())

app.use('/', mainRoutes)
app.use('/books', bookRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}, you better catch it!`)
})
