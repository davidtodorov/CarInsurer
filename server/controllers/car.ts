import  { Request, Response, NextFunction } from 'express';
import ICarCreate from '../interfaces/car/ICarCreate';
import { Car } from '../models/car';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        let car = await Car.findOne().populate('owner');
        console.log(car);
        return res.send(car);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const requestModel:ICarCreate = req.body;
        const createdCar = await Car.create(requestModel);
        res.send(createdCar);
    }
}