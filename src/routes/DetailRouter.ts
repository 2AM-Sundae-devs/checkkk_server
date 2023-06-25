import express from 'express';

const router = express.Router();

router.get('/details', (req, res) => {
  console.log(req);

  console.log(res.send('Hello, user'));
});

export default router;
