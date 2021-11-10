import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { app } from '..';
import IInsuranceCreate from '../interfaces/insurance/IInsuranceCreate';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        return res.send("good");
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();
        const reqModel = req.body as IInsuranceCreate;

        await session.withTransaction(async () => {
            let insurance = await app.serviceContainer.insuranceService.createInsurance(reqModel, session);
            res.send(insurance);
        });

        session.endSession();
    }
}
