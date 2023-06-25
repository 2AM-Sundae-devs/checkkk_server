import express from 'express';

const router = express.Router();

export const detailRouter = router.get('/', (req, res) => {
  console.log(req);

  res.status(200).json('Detail, router');
});
