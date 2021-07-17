import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import all Routes
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import messageRoute from './routes/messageRoute.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', postRoute);
app.use('/api', notificationRoute);
app.use('/api', messageRoute);

app.get('/', (req, res, next) => {
  res.send('API is running...');
});

export default app;
