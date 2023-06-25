import express from 'express';

const router = express.Router();

router.get('/charts', (req, res) => {
  console.log(res.send('Hello, user'));
});

export default router;
