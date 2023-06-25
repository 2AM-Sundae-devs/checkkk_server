import express from 'express';
import { User } from '../../models/User';

const router = express.Router();

router.post('/login', async (req, res) => {
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

  res.status(201).json({ message: 'login success' });
});

export default router;
