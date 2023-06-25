import express from 'express';

const router = express.Router();

export const chartRouter = router.get('/', (req, res) => {
  res.status(200).json('Hello, user');
});
