const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
	const salt = bcrypt.genSaltSync(10)
	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)
	User.findOne({username: req.body.username}, (error, userExists) => {
		if (userExists) {
			res.send('That username is taken!')
		} else {
			User.create(req.body, (error, createdUser) => {
				res.send('User created')
			})
		}
	})
})

module.exports = router