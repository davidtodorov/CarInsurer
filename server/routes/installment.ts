import controllers from '../controllers'
import app from 'express';
import { handlePromiseErrors } from './errorHandlingRouter';

const router = app.Router();

router.get('/', handlePromiseErrors(controllers.installment.get));

router.put('/:id', handlePromiseErrors(controllers.installment.put));

export default router;

