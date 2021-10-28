import controllers from '../controllers'
import app from 'express';

const router = app.Router();

router.get('/', controllers.insurance.get);

export default router;