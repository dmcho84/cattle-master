import { Request, Response, NextFunction } from 'express';
import db from '../../models';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  email: string;
  password: string;
}

/** 회원가입 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};

/** 로그인 */
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};

/** 로그인 체크 */
export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json({ result: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
