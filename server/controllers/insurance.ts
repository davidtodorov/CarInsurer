import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { app } from '..';
import IInsuranceCreate from '../interfaces/insurance/IInsuranceCreate';
import { Insurance } from '../models/insurance';
import { IInsuraceWorkflow } from '../services/insuranceWorkflow';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const insurances = await Insurance.find().populate({
            path: 'car',
            select: 'plateNumber',
            populate: {
                path: 'owner'
            }
        });
        return res.send(insurances);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();
        const reqModel = req.body as IInsuraceWorkflow;

        await session.withTransaction(async () => {
            let insurance = await app.serviceContainer.insuranceWorkflow.create(reqModel, session);
            res.send(insurance);
        });

        session.endSession();
    }
}
