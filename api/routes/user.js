const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

// CONTROLLERS
const UserController = require('../controllers/user')


// ALL 
router.get('/', checkAuth, UserController.user_get_all )

// Create new user
router.post('/signup', UserController.user_signup)

// Create token
router.post('/login', UserController.user_login )

// Delete
router.delete('/:userId', checkAuth, UserController.user_delete_one )

module.exports = router;

