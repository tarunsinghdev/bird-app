import User from '../models/userModal.js';

export const getUserById = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      });
    }
    req.profile = user;
    next();
  });
};
