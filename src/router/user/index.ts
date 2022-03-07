require('dotenv').config();

import { Router, Request, Response, NextFunction } from 'express';

import { mustLogedIn } from '../../controllers/middleware/passport';
import * as authCtrl from '../../controllers/user/auth';
import * as userCtrl from '../../controllers/user';

const router = Router();

router.get('/', mustLogedIn, userCtrl.userFind);
router.get('/all', userCtrl.allUserFind);

router.post('/signup', authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.post('/auth', mustLogedIn, authCtrl.authCheck);

export default router;
