import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Listening to port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold
  );
});

//DB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected succesfully'.cyan.underline))
  .catch((err) => console.log('Error'.red.underline.bold));
