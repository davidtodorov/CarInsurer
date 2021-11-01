import controllers from '../controllers'
import app, { Request, Response, NextFunction, RequestHandler} from 'express';
import { handlePromiseErrors } from './errorHandlingRouter';

const router = app.Router();

router.get('/', controllers.insurance.get);

router.post('/', controllers.insurance.post)

export default router;
