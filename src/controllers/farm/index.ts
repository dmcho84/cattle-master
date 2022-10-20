import { Request, Response, NextFunction } from 'express';
// import {} from '../user/auth';

import db from '../../models';

// export interface CustomRequest extends Request {
//   user: typeof db.User;
// }
/** Farm 생성 */
export const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name, code } = req.body;
    const MasterId = req.user.id;

    console.log({ MasterId });


    const generateFarm = await db.Farm.create({ name, code, MasterId });
    const settingOwner = await db.Member.create({ UserId: MasterId, FarmId: generateFarm.id, position: "owner"});
    const result = await db.Farm.findOne({ where: {name}, include: {
      model: db.Members,
      as: "Members",
    } })
    // const newFarm = result.get({ plain: true });

    console.log({
      generateFarm,
      settingOwner,
      result
    })


    // db.Farm.create({ name, code, MasterId })
    //   .then(async (farm: any) => {
    //     const plainFarm = await farm.get({ plain: true });
    //     console.log({ plainFarm });

    //     db.Member.create({ UserId: MasterId, FarmId: farm.id, position: "owner" }).then(
    //       async (member: any) => {
    //         const plainMember = member.get({ plain: true });
    //         console.log({ plainMember });
            
    //         db.User.findOne({
    //           where: {
    //             id: MasterId,
    //           },
    //           include: {
    //             model: db.Farm,
    //           },
    //         }).then(async (user: any) => {
    //           const plainUser = user.get({ plain: true });
    //           const resultFarm = await db.Farm.findOne({
    //             where: { id: plainFarm.id },
    //             include: db.Member
    //           }).then((result: any) => {
    //             const finish = result.get({plain: true})
    //             res.json({finish})
    //           })
    //           // const resultFarm = db.Farm.findOne({
    //           //   where: { id: plainFarm.id },
    //           //   include: db.Member
    //           // }).then((result:any) => {
    //           //   res.json(result);
    //           // })

    //           // res.json({
    //           //   plainFarm,
    //           //   plainUser
    //           // });
    //         });
    //       },
    //     );
    //     // res.json(plainFarm);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //     next(err);
    //   });
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
