// imports
const express =  require('express')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const router = express.Router()

const Vehicles = require('./models/vehicles.js')
const User = require('./models/user.js')
//  Connect to DataBase
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useunifiedTopology: true
}, () => {
	console.log('db connected');
})

const db = mongoose.connection

db.on('connected', () => {
	console.log('mongoose connected to', MONGODB_URI);
})
db.on('disconnected', () => {
	console.log('mongoose disconnected to', MONGODB_URI);
})
// db.on('error', (err) => {
// 	console.log('mongoose error', error);
// })

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/pictures'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Session
const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here\'s SESSION_SECRET')
console.log(SESSION_SECRET)

// now we can set up our session with our secret
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  }))

// this middleware attaches a cookie to our responses
// which will then get saved by the user's browser
// the browser will then send it back in its requests
// the server will then be able to identify the user
// using cookies
// think of the cookies like a key or maybe an ID card

// when the server gets a request, it checks for cookies
// and if it finds one attaches a session object
// to the request object
// we can use the session object to track information
// about the user

// routes to demonstrate sessions and cookies

// all the information is being tracked on the back end
// if we restart our server, all sessions will end

// custom middleware to make currentUser available as
// a local variable on all routes

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})

app.get('/check-session-property', (req, res) => {
  if (req.session.someProperty) {
    res.send(req.session.someProperty)
  } else {
    res.send("We haven't set anything yet!")
  }
})

app.get('/set-session-property/:value', (req, res) => {
  // we can set session properties directly
  // on the session object
  req.session.someProperty = req.params.value
  res.redirect('/vehicles')
})

// we can also purposely destroy our session
// by calling .destroy() on it
// think about logging out from app
app.get('/destroy-session', (req, res) => {
  req.session.destroy()
  res.redirect('/vehicles')
})


// connect controllers
const vehicleController = require('./controllers/vehiclesController.js')
app.use('/vehicles', vehicleController)
const userController = require('./controllers/userController.js')
app.use('/users', userController)

app.listen(process.env.PORT || 3000)



