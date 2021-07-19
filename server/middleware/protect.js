import jwt from 'jsonwebtoken';
import User from '../models/userModal.js';

const protect = async (req, res, next) => {
  try {
    let token;

    //Checking token if its present

    if (req.headers.cookie) {
      // No BEARER in cookie received
      token = req.headers.cookie.split('=')[1];
    }
    if (!token) {
      throw Error('No token found.');
    }

    //Verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      throw Error('The user belonging to the token does not exist');
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ status: 'fail', message: error.message });
  }
};

export default protect;
