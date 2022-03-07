import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

/** app.use Middleware */
export const passportMiddleware = (
  req: any,
  res: Response,
  next: NextFunction,
) =>
  passport.authenticate('jwt', { session: false }, (error, user) => {
    //verifyUser에서 user를 찾았다면 서버에게 요청하는 req객체의 user에 담아서 서버에게 넘겨줌
    if (user) {
      // req.user = user.id;
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        Farms: user.Farms,
      };
    }
    next();
  })(req, res, next);

/** router.method Middleware */
export const mustLogedIn = passport.authenticate('jwt', { session: false });
