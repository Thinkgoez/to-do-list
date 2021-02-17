const express = require('express')
const passport = require('passport')
const controller = require('../controllers/auth')
const router = express.Router()


router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/profile', passport.authenticate('jwt', { session: false }), controller.profile)


module.exports = router