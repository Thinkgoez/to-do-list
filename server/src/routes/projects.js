const express = require('express')
const passport = require('passport')
const controller = require('../controllers/projects')
// const upload = require('../middleware/upload')
const router = express.Router()


router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', controller.getByID)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)


module.exports = router