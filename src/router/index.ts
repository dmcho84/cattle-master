import { Router } from 'express';
const router = Router();
import userRouter from './user';
import farmRouter from './farm';
import cowRouter from './cow';

router.get('/', (req, res, next) => {
  res.send('Welcome!!!');
});

router.use('/user', userRouter);
router.use('/farm', farmRouter);
router.use('/cow', cowRouter);
export default router;
