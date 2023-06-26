import express from 'express';

const router = express.Router();

export const detailRouter = router.get('/', (req, res) => {
  // const { userId } = req.cookies.userId;

  // if (!userId) {
  //   return res.status(401).json({ message: 'No user ID cookie found' });
  // }

  // const applications: IApplication[] = await Application.findById(userId);

  res.status(200).json('Detail, router');
});
