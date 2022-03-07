import { Request, Response, NextFunction } from 'express';
// import {} from '../user/auth';

import db from '../../models';

// export interface CustomRequest extends Request {
//   user: typeof db.User;
// }
/** Farm 생성 */
export const create = (req: any, res: Response, next: NextFunction) => {
  try {
    const { name, code } = req.body;
    const MasterId = req.user.id;

    console.log({ MasterId });

    db.Farm.create({ name, code, MasterId })
      .then(async (farm: any) => {
        const plainFarm = farm.get({ plain: true });
        console.log({ plainFarm });

        db.Member.create({ UserId: MasterId, FarmId: farm.id }).then(
          async (member: any) => {
            const plainMember = member.get({ plain: true });
            console.log({ plainMember });

            db.User.findOne({
              where: {
                id: MasterId,
              },
              include: {
                model: db.Farm,
              },
            }).then((user: any) => {
              const plainUser = user.get({ plain: true });
              res.json({
                farm: plainFarm,
                member: plainMember,
                user: plainUser,
              });
            });
          },
        );
        // res.json(plainFarm);
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** Farm 삭제 */
export const del = (req: Request, res: Response, next: NextFunction) => {};

/** Farm 정보 */
export const get = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  console.log(user);
  res.json(user);
};

/** Farm 수정 */
export const put = (req: Request, res: Response, next: NextFunction) => {};
