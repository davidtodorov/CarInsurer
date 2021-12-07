import moment from "moment";
import mongoose from "mongoose";
import { IInsuranceEvent, InsuranceEvent } from "../models/event";
import { Installment } from "../models/installment";
import { Insurance } from "../models/insurance";

export default class EventService {
    constructor() { }

    public async getEvents(id?: string, insuranceId?: string) {
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

        return events;
    }

    public async createEvent(files: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,
        reqModel: IInsuranceEvent) {
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
            (files as Express.Multer.File[]).forEach((file) => {
                images.push(file.filename);
            });
        }

        let event = await InsuranceEvent.create({ insurance: reqModel.insurance, date: reqModel.date, description: reqModel.description, images });
        let insurance = await Insurance.findOne({ _id: reqModel.insurance });

        insurance?.events.push(event._id);
        insurance?.save();
    }

    public async deleteEvent(id: string) {
        let event = await InsuranceEvent.findOne({ _id: id });
        let updateInsuranceResult = await Insurance.updateOne({ _id: event?.insurance },
            { $pull: { events: new mongoose.Types.ObjectId(id) }});
        return await InsuranceEvent.deleteOne({ _id: id });
    }
}