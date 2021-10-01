const express = require('express')
const router = express.Router()
// remember to import your models!
// the path will be different from server.js
const Vehicles = require('../models/vehicles')

// set up index Route "index.ejs"
router.get('/', (req, res) => {

  Vehicles.find({}, (err, allVehicles) => {
    res.render('index.ejs', {
      Vehicles: allVehicles
    })
  })

})

//set up about Route "about.ejs"
router.get('/about', (req, res) => {
    res.render('about.ejs')
})

// set up contact Route "contact.ejs"
router.get('/contact', (req, res) => {
    res.render('contact.ejs')
})

// set up login Route "login.ejs"
router.get('/login', (req, res) => {
    Vehicles.find({}, (err, allVehicles) => {
    res.render('login.ejs', {
      Vehicles: allVehicles
    })
  })
})

// set up new Route "new.ejs"
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

// set up index of cars Route "allcars.ejs"
router.get('/allcars', (req, res) => {
  Vehicles.find(req.params.id, (err, foundVehicles) => {
    console.log(foundVehicles)
      res.render('allcars.ejs', { 
        foundVehicles: foundVehicles
  })
})
})

// set up Show Route
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
    else if(foundVehicle.type == 'classics')
    {
      res.render('classics.ejs', {
        foundVehicle: foundVehicle
      })
    }
    else if(foundVehicle.type == 'track')
    {
      res.render('track.ejs', {
        foundVehicle: foundVehicle
      })
    }
    else if(foundVehicle.type == 'chopper')
    {
      res.render('chopper.ejs', {
        foundVehicle: foundVehicle
      })
    }
  })
})

// set up POST Route "Create"
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

// set up DELETE Route
router.delete('/:id', (req, res) => {
  Vehicles.findByIdAndDelete(req.params.id, (err, deletedVehicle) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
     res.redirect('/vehicles/allcars')
    }
  })
})

// set up EDIT Route 
router.get('/:id/edit', (req, res) => {
  Vehicles.findById(req.params.id, (err, foundVehicle) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      res.render('edit.ejs', {
        foundVehicle: foundVehicle,
      })
    }
  })
})

router.put('/:id', (req, res) => {
  req.body.readyToRent = (req.body.readyToRent === 'on')
  Vehicles.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {
      new: true,
    },
    (err, updatedVehicle) => {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        // redirect to the index route
        res.redirect('/vehicles/allcars')
      }
    } )
})

module.exports = router