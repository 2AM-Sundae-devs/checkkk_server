import express from 'express';
import { User } from '../../models/User';

const router = express.Router();

router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    res.cookie('userId', newUser.id.toString(), { httpOnly: true });

    res.status(201).json({ message: 'login success' });
  } catch (err) {
    console.log('signup err : ', err);
    res.status(500).json({ message: 'something went wrong' });
  }
});

export default router;
