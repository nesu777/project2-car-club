const express = require('express')
const router = express.Router()
// remember to import your models!
// the path will be different from server.js
const Vehicles = require('../models/vehicles')

//index ROUTE "index.ejs"
router.get('/', (req, res) => {

  Vehicles.find({}, (err, allVehicles) => {
    res.render('index.ejs', {
      vehicles: allVehicles
    })
  })

})

//about ROUTE "about.ejs"
router.get('/about', (req, res) => {
    res.render('about.ejs')
})

//contact ROUTE "contact.ejs"
router.get('/contact', (req, res) => {
    res.render('contact.ejs')
})

//login ROUTE "login.ejs"
router.get('/login', (req, res) => {
    res.render('login.ejs')
})

//award designs ROUTE "awardshow.ejs"
router.get('/awardshow', (req, res) => {
    res.render('awardshow.ejs')
})

//new ROUTE "new.ejs"
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

router.get('/seed', (req, res) => {

  Vehicles.create([
    {
      name: '67 Mustang',
      img: '../pictures/67 fastback green.jpeg'
    },
    {
      name: 'BMW Motorcycle',
      img: '../pictures/bmw-r1250gs-custom (1).jpg'
    },
  ], (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/vehicles')
  })
})


router.get('/:id', (req, res) => {
  Vehicles.findById(req.params.id, (err, foundVehicle) => {
    console.log(foundVehicle)
    res.render('show.ejs', { vehicles: foundVehicle })
  })
})

module.exports = router