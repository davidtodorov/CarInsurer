import { Request, Response, NextFunction } from 'express';
import { IInsuranceEvent, InsuranceEvent } from '../models/event';
import { Installment } from '../models/installment';
import { Insurance, IInsurance } from '../models/insurance';
import moment from 'moment'
import mongoose from 'mongoose';


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { insuranceId } = req.query;
        let queryOptions = {}
        if (id) {
            queryOptions = { _id: id };
        } else if (insuranceId) {
            queryOptions = { insurance: insuranceId }
        };
        const events = await InsuranceEvent.find(queryOptions).populate({
            path: 'insurance',
            populate: {
                path: 'car',
                select: 'plateNumber',
                populate: {
                    path: 'owner',
                    select: 'firstName lastName'
                }
            }
        });
        res.send(events);
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        let files = req.files as any;
        const reqModel = req.body as IInsuranceEvent;
        console.log(reqModel.date)

        let installments = await Installment.find({ insurance: reqModel.insurance });
        let installmentsTillDate = installments.filter(x => x.startDate <= moment(reqModel.date).toDate());
        if (!installmentsTillDate.every(x => x.isPaid === true)) {
            throw new Error("The insurance untill this date is not paid!")
        }
        if (installmentsTillDate.length === 0) {
            let startDate = installments.sort((a, b) => b.startDate.getTime() - b.startDate.getTime())[0].startDate;
            let startDateString = moment(startDate).format("DD/MM/YYYY")
            throw new Error(`Choose date after or equal to : ${startDateString}`)
        }

        let images: String[] = [];
        if (files) {
            files.forEach((file: Express.Multer.File) => {
                images.push(file.filename);
            });
        }

        let event = await InsuranceEvent.create({ insurance: reqModel.insurance, date: reqModel.date, description: reqModel.description, images });
        let insurance = await Insurance.findOne({ _id: reqModel.insurance });

        insurance?.events.push(event._id);
        insurance?.save();

        return res.send(event);
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let event = await InsuranceEvent.findOne({ _id: id });
        let updateInsuranceResult = await Insurance.updateOne({ _id: event?.insurance },
            { $pull: { events: new mongoose.Types.ObjectId(id) }});
        let result = await InsuranceEvent.deleteOne({ _id: id });
        res.send(result);
    }
}   