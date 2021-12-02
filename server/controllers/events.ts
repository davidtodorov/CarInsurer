import { Request, Response, NextFunction } from 'express';
import IUserCreate from '../interfaces/user/IUserCreate';
import { IInsuranceEvent, InsuranceEvent } from '../models/event';
import { Insurance } from '../models/insurance';
import { User } from '../models/user';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const events = await InsuranceEvent.find(id ? { _id: id } : {}).populate({
            path: 'insurance',
            populate: {
                path: 'car',
                select: 'plateNumber',
                populate: {
                    path: 'owner',
                    select: 'firstName lastName'
                }
            }
        });
        res.send(events);
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

        let event = await InsuranceEvent.create({ insurance: reqModel.insurance, date: reqModel.date, description: reqModel.description, images });
        return res.send(event);
    }
}