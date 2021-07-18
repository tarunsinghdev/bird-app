import User from '../models/userModal.js';
import { generateToken } from '../utils/generateToken.js';

export const signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = generateToken(newUser._id);

    res.cookie('token', token, {
      expire: new Date() + process.env.COOKIE_EXPIRES_IN,
      httpOnly: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw Error("Fields can't be empty");

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password, user.password))) {
      throw Error('Incorrect email or password');
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
      expire: new Date() + process.env.COOKIE_EXPIRES_IN,
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const signout = (req, res) => {
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json({ message: 'User Signed out succesfully' });
};
