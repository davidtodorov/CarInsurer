import controllers from '../controllers'
import app from 'express';
import { handlePromiseErrors } from './errorHandlingRouter';

const router = app.Router();

router.get('/', handlePromiseErrors(controllers.car.get));

router.post('/', handlePromiseErrors(controllers.car.post))

export default router;

