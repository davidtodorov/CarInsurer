import { Request, Response, NextFunction } from 'express';
import IUserCreate from '../interfaces/user/IUserCreate';
import { IInsuranceEvent, InsuranceEvent } from '../models/event';
import { User } from '../models/user';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        // let users = await User.find({});
        // res.send(users);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        let files = req.files as any;
        if (files.length === 0) {
            return res.status(500).send({ message: 'Upload fail' });
        };

        const reqModel = req.body as IInsuranceEvent;
        let images: String[] = [];
        files.forEach((file: Express.Multer.File) => {
            images.push(file.filename);
        });

        let event = await InsuranceEvent.create({ car: reqModel.car, date: reqModel.date, description: reqModel.description, images });
        return res.send(event);
    }
}