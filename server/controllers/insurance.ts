import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { app } from '..';
import { Car, ICar } from '../models/car';
import { InsuranceEvent } from '../models/event';
import { Installment } from '../models/installment';
import { Insurance } from '../models/insurance';
import { User } from '../models/user';
import { IInsuraceWorkflow } from '../services/insuranceWorkflow';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const extended = req.query.extended;
        const query = Insurance.find(id ? { _id: id } : {}).populate({
            path: 'car',
            populate: {
                path: 'owner'
            }
        });

        if (extended === "true") {
            query
                .populate('installments')
                .populate('events')

        }
        let insurances = await query.exec();
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
    },
    put: async (req: Request, res: Response, next: NextFunction) => {

    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let insurance = await Insurance.findOne({ _id: id }).populate('car');
        let car = insurance?.car as any as ICar;
        let carId = car._id;
        let userId = car.owner;
        await User.deleteOne({ _id: userId });
        await Car.deleteOne({ _id: carId });
        await Installment.deleteMany({ _id: { $in: insurance?.installments || [] } });
        await InsuranceEvent.deleteMany({ insurance: id });
        let result = await Insurance.deleteOne({ _id: id })

        res.send(result);
    },
}
