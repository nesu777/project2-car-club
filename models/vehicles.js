const mongoose = require('mongoose')
const { Schema , model } = mongoose
mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring

const vehicleSchema = new Schema({
  type: {type:String, required: true},
  name: {type: String, required: true},
  img: {type: String, required: true},
  img2: {type: String, required: true},
  readyToRent: {type: Boolean, default: false}
})

// "model()" will initialized the collection
//            collection name
const Vehicles = model('Vehicles', vehicleSchema)

module.exports = Vehicles