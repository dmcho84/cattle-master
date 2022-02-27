import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import { users } from './seeders/users';
import { farms } from './seeders/farms';
import { members } from './seeders/members';
import { cows } from './seeders/cows';
import { boarns } from './seeders/boarns';
import { feeds } from './seeders/feeds';
import { feedings } from './seeders/feedings';

const seedersGenerator = async (list: any[], model: string) => {
  let result: any[] = [];
  for (const item of list) {
    await db[model]
      .findOrCreate({
        where: { ...item },
        default: { ...item },
      })
      .then((data: any) => {
        // console.log(model, { data });
        result.push(data[0].dataValues);
      })
      .catch(async (err: any) => {
        console.error(err);
        // const find = await db[model].findOne({
        //   [err.errors[0].path]: item[err.errors[0].path],
        // });
        // console.log({ find });
        // result.push(find);
      });
  }
  return result;
};

/** post Boarn */
const seedersBoarns = async () => {
  for (const boarn of boarns) {
    const mother = await db.Cow.findOne();
    const cow = {
      nickname: boarn.nickname,
      birthday: boarn.birthday,
      gender: boarn.gender,
      classification: '혈통',
      mother: mother.id,
    };
    const cowList = await seedersGenerator([cow], 'Cow');
    const boarnList = await seedersGenerator(
      [
        {
          birthday: boarn.birthday,
          gender: boarn.gender,
          weight: boarn.weight,
          status: boarn.status,
          etc: boarn.etc,
          MotherId: mother.id,
          selfId: cowList[0].id,
        },
      ],
      'Boarn',
    );

    return { boarnList, cowList };

    // const self = await db.Cow.create();

    // await db.Boarn.create({
    //   ...boarn,
    //   selfId: self.id,
    // });
  }
};

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

app.get('/seeder', async (req, res, next) => {
  const userList = await seedersGenerator(users, 'User');
  const farmList = await seedersGenerator(farms, 'Farm');
  console.log({ userList });
  let memebersList = await members.map((m, i) => {
    m.UserId = userList[i].id;
    return m;
  });
  console.log(memebersList);
  const memberList = await seedersGenerator(memebersList, 'Member');
  const cowList = await seedersGenerator(cows, 'Cow');
  const feedList = await seedersGenerator(feeds, 'Feed');
  const boarnList = await seedersBoarns();

  res.send({ userList, farmList, memberList, cowList, feedList, boarnList });
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
});
