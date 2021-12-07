import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { app } from '..';
import { IInstallment, Installment } from '../models/installment';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { insuranceId } = req.query;
        const installments = await app.serviceContainer.installmentService.getInstallmentsByInsuranceId(insuranceId as string);
        return res.send(installments);
    },
    put: async (req: Request, res: Response, next: NextFunction) => {
        const model = req.body as IInstallment;
        const result = await app.serviceContainer.installmentService.updateInstallment(model);
        res.send(result);
    }
}