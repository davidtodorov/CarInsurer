import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { app } from '..';
import { Insurance } from '../models/insurance';
import { IInsuraceWorkflow } from '../services/insuranceWorkflow';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let result = await app.serviceContainer.insuranceService.getInsurance(id);
        return res.send(result);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();
        const reqModel = req.body as IInsuraceWorkflow;

        await session.withTransaction(async () => {
            let insurance = await app.serviceContainer.insuranceWorkflow.create(reqModel, session);
            res.send(insurance);
        });

        session.endSession();
    },
    put: async (req: Request, res: Response, next: NextFunction) => {

    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let result = await app.serviceContainer.insuranceService.deleteInsurance(id);
        res.send(result);
    },
}
