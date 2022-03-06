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
    // console.log({ item });
    await db[model]
      .findOrCreate({
        where: { ...item },
        default: { ...item },
      })
      .then((data: any) => {
        // console.log(model, data[0].dataValues);
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
const seedersBoarns = async (UserId: string, FarmId: number) => {
  for (const boarn of boarns) {
    const mother = await db.Cow.findOne();
    const cow = {
      nickname: boarn.nickname,
      birthday: boarn.birthday,
      gender: boarn.gender,
      classification: '혈통',
      mother: mother.id,
      UserId,
      FarmId,
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
          CowId: mother.id,
          selfId: cowList[0].id,
          UserId,
          FarmId,
        },
      ],
      'Boarn',
    );

    return { boarnList, cowList };
  }
};

const setData = (list: any[], obj?: object): any[] => {
  let arr: any[] = [];

  for (const li of list) {
    let lid = {
      ...li,
      ...obj,
    };
    arr.push(lid);
  }
  return arr;
};

const seeder = async (req: any, res: any) => {
  const userList = await seedersGenerator(users, 'User');
  const UserId: string = userList[0].id;
  const f = setData(farms, { MasterId: UserId });
  const farmList = await seedersGenerator(f, 'Farm');
  const FarmId: number = farmList[0].id;

  const m = setData(members, { UserId, FarmId });
  console.log({ m, UserId, FarmId });
  const memberList = await seedersGenerator(m, 'Member');
  const c = setData(cows, { UserId, FarmId });
  const cowList = await seedersGenerator(c, 'Cow');
  const fe = setData(feeds, { UserId, FarmId });
  const feedList = await seedersGenerator(fe, 'Feed');
  const boarnList = await seedersBoarns(UserId, FarmId);

  res.send({ userList, farmList, memberList, cowList, feedList, boarnList });
};

const getCows = async (req: any, res: any) => {
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
};

export { seeder, seedersBoarns, getCows };
