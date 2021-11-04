import  { Request, Response, NextFunction } from 'express';
import IUserCreate from '../interfaces/user/IUserCreate';
import { User } from '../models/user';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        return res.send("good");
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const requestModel = req.body as IUserCreate;
        const user = await User.create(requestModel);
        res.send(user);
    }
}