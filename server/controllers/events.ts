import  { Request, Response, NextFunction } from 'express';
import IUserCreate from '../interfaces/user/IUserCreate';
import { User } from '../models/user';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        // let users = await User.find({});
        // res.send(users);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        if(req.file) {
            
        }
    }
}