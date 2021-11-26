import { Request, Response, NextFunction } from 'express';
import { IInstallment, Installment } from '../models/installment';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.query;
        const installments = await Installment.find(id ? { _id: id } : {});
        return res.send(installments);
    },
    put: async (req: Request, res: Response, next: NextFunction) => {
        const installment = req.body as any;
        let result = await Installment.updateOne({ _id: installment._id }, installment);
        res.send(result);
    }
}