import colors from 'colors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { users } from './data/users.js';
import User from './models/userModal.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected succesfully'.cyan.underline))
  .catch((err) => console.log('Error'.red.underline.bold));

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);

    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log('Data destroyed.'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error : ${error.message}.red.inverse`);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
