import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import { setResponse } from '../../@types/response';

const router = express.Router();

export const loginRouter = router.post('/', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });
    if (!user) {
      return res
        .status(400)
        .json(
          setResponse(
            'Y',
            '가입한 유저가 없습니다.\n회원 가입 후 이용해주세요.',
          ),
        );
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json(
          setResponse(
            'Y',
            '"비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요"',
          ),
        );
    }

    res.cookie('userId', user._id.toString(), { httpOnly: false });
    res.status(200).json(setResponse('N', '로그인 성공!'));
  } catch (err) {
    console.error(err, 'login err');
    res
      .status(500)
      .json(setResponse('Y', '서버 예외처리 에러입니다. 서버에 문의해주세요!'));
  }
});
