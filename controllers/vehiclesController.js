const express = require('express')
const router = express.Router()
// remember to import your models!
// the path will be different from server.js
const Vehicles = require('../models/vehicles')

//index ROUTE "index.ejs"
router.get('/', (req, res) => {

  Vehicles.find({}, (err, allVehicles) => {
    res.render('index.ejs', {
      Vehicles: allVehicles
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
/*router.get('/awardshow', (req, res) => {
    res.render('awardshow.ejs', {
      Vehicles: foundVehicle
    })
})*/

//new ROUTE "new.ejs"
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

router.get('/seed', (req, res) => {

  Vehicles.create([
    {
      type: 'classics',
      name: '67 Mustang',
      img: '/67 fastback green.jpeg'
    },
    {
      type: 'classics',
      name: '71 Skyline',
      img: '/dsc00024-1140x703-555cdab134ab3.jpg'
    },
    {
      type: 'award',
      name: 'BMW Motorcycle',
      img: '/bmw-r1250gs-custom (1).jpg'
    },
  ], (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/vehicles')
  })
})

router.get('/allcars', (req, res) => {
  Vehicles.find(req.params.id, (err, foundVehicles) => {
    console.log(foundVehicles)
      res.render('allcars.ejs', { 
        foundVehicles: foundVehicles
  })
})
})

router.get('/:id', (req, res) => {
  Vehicles.findById(req.params.id, (err, foundVehicle) => {
    console.log(foundVehicle)
    console.log(req.params.id)
    if(foundVehicle.type == 'award')
    {
      res.render('awardshow.ejs', { 
        foundVehicle: foundVehicle, 
      })
    }
    else
    {
      res.render('classics.ejs', {
        foundVehicle: foundVehicle
      })
    }
  })
})

// set up POST ROUTE "Create"
router.post('/', (req, res) => {
  if (req.body.readyToRent === "on") {
    req.body.readyToRent = true
  } else {
    req.body.readyToRent = false
  }
  console.log(req.body)
  // res.send(req.body)
  Vehicles.create(req.body, (err, createdVehicle) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      console.log(createdVehicle)
      res.redirect('/vehicles/allcars')
    }
  })
})

// setting up our DELETE route
router.delete('/:id', (req, res) => {
  Vehicles.findByIdAndDelete(req.params.id, (err, deletedVehicle) => {
    // findByIdAndDelete will delete a document with a given id
    if (err) {
      console.log(err)
      res.send(err)
    } else {
     // redirect to the index page if the delete successful
     res.redirect('/vehicles/allcars')
    }
  })
})

module.exports = router