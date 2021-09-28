// imports
const express =  require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const router = express.Router()

const Vehicles = require('./models/vehicles.js')

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
db.on('error', (err) => {
	console.log('mongoose error', error);
})

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/pictures'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// connect controllers
const vehicleController = require('./controllers/vehiclesController.js')
app.use('/vehicles', vehicleController)

app.listen(PORT, () => {
	console.log('listening on port:', PORT);
})

