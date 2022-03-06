import { Router } from 'express';
import db from '../../models';
const router = Router();

// router.use('/', (req, res, next) => {
//   res.send('user!!!');
// });

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

export default router;
