import { Request, Response, NextFunction } from 'express';
import db from '../../models';

export const userFind = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.user);
  res.json(req.user);
};

/** 모든 유저 검색 */
export const allUserFind = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};
