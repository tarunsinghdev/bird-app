import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Invalid username'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your Email'],
      trim: true,
      unique: true,
    },
    password: { type: String, required: [true, 'Email or Password Incorrect'] },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
