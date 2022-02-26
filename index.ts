import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import { users } from './seeders/users';
import { farms } from './seeders/farms';
import { members } from './seeders/members';
import { cows } from './seeders/cows';
import { boarns } from './seeders/boarns';
import { defaultValueSchemable } from 'sequelize/types/utils';

/** get Cow Info */
app.get('/', (req, res) => {
  db.Cow.findAll({
    include: [
      {
        model: db.Boarn,
        as: 'Children',
        include: {
          model: db.Cow,
          as: 'Self',
        },
      },
    ],
  })
    .then((result: object) => res.json(result))
    .catch((err: object) => console.error(err));
});

// const seedersMembers = () => {
//   members.map(member => {
//     db.Member.create(member);
//   })
// }
const seedersCows = () => {
  cows.map((cow) => {
    db.Cow.create(cow);
  });
};

/** post Boarn */
const seedersBoarns = () => {
  boarns.map(async (boarn) => {
    const self = await db.Cow.create({
      nickname: boarn.nickname,
      birthday: boarn.birthday,
      gender: boarn.gender,
      classification: '혈통',
      mother: boarn.MotherId,
    });

    await db.Boarn.create({
      ...boarn,
      selfId: self.id,
    });
  });
};

// seedersCows();
// seedersBoarns();

// userGenerater();

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
});
