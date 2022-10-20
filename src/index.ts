import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import router from './router';

import passport from 'passport';
import passportConfig from './passport';
import { passportMiddleware } from './controllers/middleware/passport';

app.use(passport.initialize());
passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());

app.use(passportMiddleware);

/** get Cow Info */
app.use('/', router);

db.sequelize.sync({ force: true }).then(() => {

  
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
});
