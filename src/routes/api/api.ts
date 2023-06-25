import express from 'express';

const router = express.Router();

export const apiRouter = router.get('/api', (req, res, next) => {
  console.log(req);

  next();
});
