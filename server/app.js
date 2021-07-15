import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Import all Routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import notificationRoutes from './routes/notificationRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', notificationRoutes);
app.use('/api', messageRoutes);

app.get('/', (req, res, next) => {
  res.send('API is running...');
});

export default app;
