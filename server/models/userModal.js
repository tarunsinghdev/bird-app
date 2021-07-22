import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

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
    password: {
      type: String,
      required: [true, 'Email or Password Incorrect'],
      select: false,
    },
    profilePic: { type: String, default: '/images/defaultProfilePic.jpg' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    retweets: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (plainpassword) {
  return await bcrypt.compare(plainpassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
