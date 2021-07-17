import User from '../models/userModal.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
const saltRounds = 10;

export const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash;
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'Not able to save user in DB',
        });
      }
      res.json({
        firstName: user.firstName,
        id: user._id,
      });
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

    bcrypt.compare(password, user.password, function (err, result) {
      if (result == false) {
        return res
          .status(401)
          .json({ error: "Email and password doesn't match" });
      }
      if (result == true) {
        //create token using user's id
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        //store token in browser cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        //sending response to frontend
        const { _id, firstName, lastName, username, email } = user;
        res.json({
          token,
          user: { _id, firstName, lastName, username, email },
        });
      }
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie('token'); //method comes from cookie-parser
  res.json({ message: 'user signout succesfully' });
};
