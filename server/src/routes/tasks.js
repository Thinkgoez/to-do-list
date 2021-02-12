const express = require('express')
const passport = require('passport')
const controller = require('../controllers/tasks')
const router = express.Router()


router.post('/:projectID', passport.authenticate('jwt', { session: false }), controller.create)
router.get('/:projectID', controller.getByProjectID)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)


module.exports = router