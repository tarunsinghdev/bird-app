import express from 'express';
import { signup, signin, signout } from '../controllers/authController.js';
import { check } from 'express-validator';
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

export default router;
