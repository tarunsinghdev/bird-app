import dotenv from 'dotenv';
dotenv.config();

import User from '../models/userModal.js';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import { validationResult } from 'express-validator';

export const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      firstName: user.firstName,
      id: user._id,
    });
  });
};

export const signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: err,
      });
    }

    if (!user.matchPassword(password)) {
      return res
        .status(401)
        .json({ error: "Email and password doesn't match" });
    }

    //create token using user's id
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    //store token in browser cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    //sending response to frontend
    const {
      _id,
      firstName,
      lastName,
      username,
      email,
      profilePic,
      likes,
      retweets,
      following,
      followers,
    } = user;

    res.json({
      token,
      user: {
        _id,
        firstName,
        lastName,
        username,
        email,
        profilePic,
        likes,
        retweets,
        following,
        followers,
      },
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie('token'); //method comes from cookie-parser
  res.json({ message: 'user signout succesfully' });
};

//protected routes
export const isSignIn = expressJWT({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

//custom middlewares
export const isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    });
  }
  next();
};
