import  { Request, Response, NextFunction } from 'express';
import ICarCreate from '../interfaces/car/ICarCreate';
import { Car, ICar } from '../models/car';

export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let cars = await Car.find(id ? { _id: id } : {})
        .populate({
            path: 'owner',
            select: 'firstName lastName'
        });
        return res.send(cars);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        const requestModel = req.body as ICar;
        console.log(requestModel);
        const createdCar = await Car.create(requestModel);
        res.send(createdCar);
    }
}