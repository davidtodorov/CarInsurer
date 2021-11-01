import { Request, Response, NextFunction } from 'express';
import IInsuranceCreate from '../interfaces/insurance/IInsuranceCreate';
import IUserCreate from '../interfaces/user/IUserCreate';
import { IInsurance } from '../models/insurance';
import { UserModel } from '../models/user';
import carService from '../services/carService';
import insuranceService from '../services/insuranceService'
import userService from '../services/userService';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        return res.send("good");
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const reqModel: IInsuranceCreate = req.body;
        const insurance = UserModel.create(reqModel);
        res.send(insurance);
    }
}
