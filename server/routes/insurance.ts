import controllers from '../controllers'
import app, { Request, Response, NextFunction, RequestHandler } from 'express';
import { handlePromiseErrors } from './errorHandlingRouter';

const router = app.Router();

router.get('/', handlePromiseErrors(controllers.insurance.get));

router.get('/:id', handlePromiseErrors(controllers.insurance.get));

router.post('/', handlePromiseErrors(controllers.insurance.post));

router.delete('/:id', handlePromiseErrors(controllers.insurance.delete))

export default router;

