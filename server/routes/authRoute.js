import express from 'express';
import {
  signup,
  signin,
  signout,
  isSignIn,
  isAuthenticated,
} from '../controllers/authController.js';
import { check } from 'express-validator';
import User from '../models/userModal.js';
import { getUserById } from '../controllers/userController.js';
const router = express.Router();

router.post(
  '/signup',
  check('firstName').isLength({ min: 1 }).withMessage('firstName is required'),
  check('username')
    .isLength({ min: 5 })
    .withMessage('username must be at least 5 chars long'),
  check('email').isEmail().withMessage('email is not correct'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('password must contain a number'),
  signup
);

router.post(
  '/signin',
  check('email').isEmail().withMessage('email is not correct'),
  check('password').isLength({ min: 1 }).withMessage('Password is required'),
  signin
);

router.get('/signout', signout);

router.get('/test/:id', isSignIn, getUserById, isAuthenticated, (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      });
    }
    req.profile = user;
    res.send(req.profile);
  });
});

export default router;
