import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import { users } from './seeders/users';
import { farms } from './seeders/farms';
import { members } from './seeders/members';
import { cows } from './seeders/cows';

// app.get('/', (req, res) => {
//   db.User.findAll({
//     include: {
//       model: db.Farm,
//     },
//   })
//     .then((result: object) => res.json(result))
//     .catch((err: object) => console.error(err));
// });

// const seedersMembers = () => {
//   members.map(member => {
//     db.Member.create(member);
//   })
// }
// const seedersCows = () => {
//   cows.map(cow => {
//     db.Cow.create(cow);
//   })
// }

// seedersCows();

// userGenerater();

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
});
