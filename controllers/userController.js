const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/user')

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
	
	const salt = bcrypt.genSaltSync(10)
	
	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)
	// first let's see if somebody else already has this username
	User.findOne({username: req.body.username}, (err, userExists) => {
		if (userExists) {
			res.send('That username is taken!')
		} else {
			User.create(req.body, (err, createdUser) => {
				res.send('user created')
				req.session.currentUser = createdUser
				res.redirect('/vehicles')
			})
			
		}
	})
})

router.get('/seed', (req, res) => {

  User.create([
    {
      username: 'user123',
      password: 'hello123'
    },
    {
      username: 'new123',
      password: 'hello456'
    },
  ], (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/vehicles')
  })
})

router.get('/signin', (req, res) => {
		res.render('users/signin.ejs')
	}
)

router.post('/signin', (req, res) => {
	// we need to get the user with that username
	User.findOne({ username: req.body.username}, (err, foundUser) => {
		if (foundUser) {
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)

			if (req.body.password == foundUser.password){
				req.session.currentUser = foundUser
				res.redirect('/vehicles')
			} else {
				// if they don't match, send a message
				res.send('Invalid username or password')
			}
			
		} else {
			// if they don't exist, we need to send a message
			res.send('Does not exist')
		}
	})			
			
})

// DESTROY session route
router.get('/signout', (req, res) => {
	req.session.destroy()
	// this DESTROYs the session
	res.redirect('/vehicles')
})

module.exports = router