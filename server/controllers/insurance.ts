import  { Request, Response, NextFunction } from 'express';
import IInsuranceCreate from '../interfaces/insurance/IInsuranceCreate';
import { IInsurance } from '../models/insurance';
import insuranceService from '../services/insuranceService'


export default {
    get: (req: Request, res: Response, next: NextFunction) => {
        return res.send("good");
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        const insurance:IInsuranceCreate = req.body;
        console.log(insurance);
        insuranceService.creaeteInsurance(insurance);
        res.send("done");
    }
}
