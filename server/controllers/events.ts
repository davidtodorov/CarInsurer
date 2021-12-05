import { Request, Response, NextFunction } from 'express';
import { IInsuranceEvent, InsuranceEvent } from '../models/event';
import { Installment } from '../models/installment';
import { Insurance } from '../models/insurance';
import moment from 'moment'


export default {
    get: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { insuranceId } = req.query;
        let queryOptions = {}
        if (id) {
            queryOptions = { _id: id };
        } else if (insuranceId) {
            queryOptions = { insurance: insuranceId}
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
        if (files.length === 0) {
            return res.status(500).send({ message: 'Upload fail' });
        };
        const reqModel = req.body as IInsuranceEvent;
        console.log(reqModel.date)

        let installments = await Installment.find({ insurance: reqModel.insurance });
        let installmentsTillDate = installments.filter(x => x.startDate <= moment(reqModel.date).toDate());
        if (!installmentsTillDate.every(x => x.isPaid === true)) {
            throw new Error("The insurance untill this date is not paid!")
        }

        let images: String[] = [];
        files.forEach((file: Express.Multer.File) => {
            images.push(file.filename);
        });

        let event = await InsuranceEvent.create({ insurance: reqModel.insurance, date: reqModel.date, description: reqModel.description, images });
        let insurance = await Insurance.findOne({ _id: reqModel.insurance });

        insurance?.events.push(event._id);
        insurance?.save();
        
        return res.send(event);
    }
}