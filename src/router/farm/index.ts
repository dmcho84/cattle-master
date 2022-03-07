import { Router, Request, Response, NextFunction } from 'express';
import * as farmCtrl from '../../controllers/farm';
import { mustLogedIn } from '../../controllers/middleware/passport';

const router = Router();

/** Farm 생성 */
router.post('/', mustLogedIn, farmCtrl.create);

/** Farm 삭제 */
router.delete('/', mustLogedIn, farmCtrl.del);

/** Farm 정보 */
router.get('/', mustLogedIn, farmCtrl.get);

/** Farm 수정 */
router.put('/', mustLogedIn, farmCtrl.put);

export default router;
