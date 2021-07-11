import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.send('API is running...');
});

export default app;
