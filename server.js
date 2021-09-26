// imports
const express =  require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT

const Products = require('./models/products.js')

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
db.on('error', (error) => {
	console.log('mongoose error', error);
})

// Middleware
app.use(express.static('css'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// connect controllers
const productsController = require('./controllers/productsController.js')
app.use('/vehicles', vehicleController)

// home page for testing
//app.get('/', (req,res) => {
//	res.render('index.ejs')
//})

// listner
app.listen(PORT, () => {
	console.log('listening on port:', PORT);
})
