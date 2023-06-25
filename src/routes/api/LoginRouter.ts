import express from 'express';
import { User } from '../../models/User';

const router = express.Router();

export const loginRouter = router.post('/', async (req, res) => {
  console.log(req);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.cookie('userId', user.id.toString(), { httpOnly: true });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.log('login err : ', err);
    res.status(500).json({ message: 'something went wrong' });
  }
});
