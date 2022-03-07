import passport from 'passport';
// import passportLocal from 'passport-local';
// const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcrypt';
import db from '../models';

const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const passportConfig = { usernameField: 'email', passwordField: 'password' };
const passportVerify = async (email: string, password: string, done: any) => {
  try {
    // 유저 아이디로 일치하는 유저 데이터 검색
    const user = await db.User.findOne({ where: { email } });
    // 검색된 유저 데이터가 없다면 에러 표시
    if (!user) {
      done(null, false, { reason: '존재하지 않는 사용자 입니다.' });
      return;
    }
    // 검색된 유저 데이터가 있다면 유저 해쉬된 비밀번호 비교
    // const hash = bcrypt.hashSync(password, 10);

    const compareResult = await bcrypt.compare(password, user.password);

    // 해쉬된 비밀번호가 같다면 유저 데이터 객체 전송
    if (compareResult) {
      done(null, user);
      return;
    }
    // console.log({ compareResult });
    // 비밀번호가 다를경우 에러 표시
    done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'jwt-secret-key',
};

const JWTVerify = async (jwtPayload: any, done: any) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await db.User.findOne({
      where: { id: jwtPayload.id },
      include: { model: db.Farm },
    });
    // console.log({ user: user.get({ plain: true }) });
    // 유저 데이터가 있다면 유저 데이터 객체 전송
    if (user) {
      done(null, user);
      return;
    }
    // 유저 데이터가 없을 경우 에러 표시
    done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

export default () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
};
