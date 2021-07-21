import express from 'express';

import { getUserById } from '../controllers/userController.js';

const router = express.Router();

// const { getUserById, getUser } = require('../controllers/userController');
// const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');

// router.get('/user/:userId', isSignIn, getUserById, isAuthenticated, getUser);

// router.get('/login', getUserById);

export default router;
