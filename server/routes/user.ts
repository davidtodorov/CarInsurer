import controllers from '../controllers'
import app from 'express';
import { handlePromiseErrors } from './errorHandlingRouter';

const router = app.Router();

router.get('/', handlePromiseErrors(controllers.user.get));

router.post('/', handlePromiseErrors(controllers.user.post))

export default router;

