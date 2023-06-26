import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import { setResponse } from '../../@types/response';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    if (!nickname) {
      return res.status(400).json(setResponse('Y', '닉네임을 입력해주세요.'));
    }
    if (!password) {
      return res.status(400).json(setResponse('Y', '비밀번호를 입력해주세요.'));
    }

    const existingUser = await User.findOne({ nickname });

    if (existingUser) {
      return res
        .status(409)
        .json(
          setResponse(
            'Y',
            '동일한 닉네임으로 가입한 유저가 있습니다.\n다른 닉네임을 사용해주세요.',
          ),
        );
    }

    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      nickname,
      password: hashedPassword,
    });

    await newUser.save();

    res.cookie('userId', newUser._id.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    res.status(201).json({
      ...setResponse('N', '회원가입 완료!'),
      authorization: newUser.id.toString(),
    });
  } catch (err) {
    console.log(err, 'at signUp');
    res
      .status(500)
      .json(setResponse('Y', '서버 예외처리 에러입니다. 서버에 문의해주세요!'));
  }
});

export default router;
