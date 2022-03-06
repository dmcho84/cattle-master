import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import router from './router';
import * as test from './test';

// class Server {
//   public app: express.Application;

//   constructor() {
//     this.app = express();
//     // this.config();
//   }

//   public config(): void {
//     this.app.set('port', process.env.PORT || 3000);
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: false }));
//     this.app.use(compression());
//     this.app.use(cors());
//   }

//   public routes(): void {
//     this.app.use('/' router);

//   }

//   public start(): void {
//     db.sequelize.sync({ force: false }).then(() => {
//       app.listen(port, () => {
//         console.log(`App listening on PORT ${port}`);
//       });
//     });
//   }
// }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());

/** get Cow Info */
app.get('/', test.getCows);
app.use('/', router);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
});

// const server = new Server();
// server.start();
