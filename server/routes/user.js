var express = require('express');
var router = express.Router();
const { getUserById, getUser } = require('../controllers/user');
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');

router.get('/user/:userId', isSignIn, getUserById, isAuthenticated, getUser);

module.exports = router;
