const express = require('express')
const passport = require('passport')
const controller = require('../controllers/projects')
const router = express.Router()

router.get('/:id', controller.getByID)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

module.exports = router