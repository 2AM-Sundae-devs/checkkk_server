import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const existingUser = await User.findOne({ nickname });
    console.log(existingUser);

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);

    // const newUser = new User({
    //   nickname,
    //   password: hashedPassword,
    // });

    const newUser = new User({
      nickname,
      password,
    });
    await newUser.save();

    console.log(newUser);

    // res.cookie('userId', newUser._id.toString(), { httpOnly: true });

    res.status(201).json({ message: 'login success' });
  } catch (err) {
    console.log('signup err : ', err);
    res.status(500).json({ message: 'something went wrong' });
  }
});

export default router;
