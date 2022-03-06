require('dotenv').config();

import { Router } from 'express';
import db from '../../models';
import passport from 'passport';
import { mustLogedIn } from '../../passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// router.use('/', (req, res, next) => {
//   res.send('user!!!');
// });

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.json(req.user);
});

router.get('/all', async (req, res, next) => {
  db.User.findAll({
    include: [
      {
        model: db.Farm,
        // as: 'Children',
        // include: {
        //   model: db.Cow,
        //   as: 'Self',
        // },
      },
      {
        model: db.Farm,
        as: 'Master',
        // include: {
        //   model: db.Farm,
        //   as: 'MatserId',
        // },
      },
    ],
  })
    .then((result: object) => res.json(result))
    .catch((err: object) => console.error(err));
  //   const users = await db.User.findAll({
  //     include: [
  //       {
  //         models: db.Farm,
  //       },
  //     ],
  //   });
  //   console.log(users.get());
  //   res.send = users.dataValues;
});

interface IUser {
  name: string;
  email: string;
  password: string;
}

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password }: IUser = req.body;
    const hash = bcrypt.hashSync(password, 10);
    await db.User.create({
      name,
      email,
      password: hash,
    }).then((user: any) => res.json(user));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/signin', (req, res, next) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    passport.authenticate('local', (passportError, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError || !user) {
        res.status(400).json({ message: info.reason });
        return;
      }
      // user데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          res.send(loginError);
          return;
        }
        // 클라이언트에게 JWT생성 후 반환
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET || 'jwt-secret-key',
        );
        res.json({ token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/auth', mustLogedIn, async (req, res, next) => {
  try {
    res.json({ result: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
