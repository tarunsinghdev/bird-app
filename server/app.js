import express from 'express';

// Import all Routes
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import notificationRoute from './routes/notificationRoute.js';
import messageRoute from './routes/messageRoute.js';

const app = express();

//Middlewares
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('API is running...');
});

//Routes
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', postRoute);
app.use('/api', notificationRoute);
app.use('/api', messageRoute);

export default app;
