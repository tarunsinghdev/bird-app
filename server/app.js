import express from 'express';

const app = express();

//Import all Routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/userRoutes';
import notificationRoutes from './routes/userRoutes';
import messageRoutes from './routes/userRoutes';

app.get('/', (req, res, next) => {
  res.send('API is running...');
});

app.get('/login', userRoutes);

export default app;
