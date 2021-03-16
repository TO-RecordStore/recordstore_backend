const express = require('express')
const router = express.Router()

const {getUsers, addUser, loginUser,viewUserInfo,updateUser} = require('../controllers/usersControllers')

// GET ('/') all users
// POST ('/') create user --> login
// POST ('/login') validate user --> login
// GET ('/:id') see user's profile
// POST ('/:id/update') update profile

router.route('/')
	.get(getUsers)
	.post(addUser)


router.route('/login').post(loginUser)

router.route('/:id').get(viewUserInfo)

router.route('/:id/update').post(updateUser)



module.exports = router