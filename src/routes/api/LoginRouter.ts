import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';

const router = express.Router();

export const loginRouter = router.post('/', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // res.cookie('userId', user._id.toString(), { httpOnly: true });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.log('login err : ', err);
    res.status(500).json({ message: 'something went wrong' });
  }
});
