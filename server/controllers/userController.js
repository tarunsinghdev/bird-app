import User from '../models/userModal.js';

//middleware for validations (like checking if a user exists) or grabbing important information about session user
export const getUserById = (req, res, next) => {
  User.findById(req.params.userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      });
    }
    req.profile = user;
    next();
  });
};
