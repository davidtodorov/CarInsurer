import { Request, Response, NextFunction } from 'express';
import IInsuranceCreate from '../interfaces/insurance/IInsuranceCreate';
import { User } from '../models/user';
import insuranceService from '../services/insuranceService';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        return res.send("good");
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const session = await User.startSession();
        const reqModel = req.body as IInsuranceCreate;

        await session.withTransaction(async () => {
            let insurance = await insuranceService.creaeteInsurance(reqModel, session);
            res.send(insurance);
        });
    }
}
