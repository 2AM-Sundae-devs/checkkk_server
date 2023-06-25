import express from 'express';

const router = express.Router();

export const homeRouter = router.get('/', (req, res) => {
  res.send('Hi!');
});
