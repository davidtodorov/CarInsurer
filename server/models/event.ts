import { Schema, model, ObjectId } from 'mongoose';
import { ICar } from './car';
import { IInsurance } from './insurance';

const { String, Date, ObjectId, Buffer } = Schema.Types;

export interface IInsuranceEvent {
    _id: String,
    date: Date;
    description: String;
    car: ICar['id'];
    images: String[]

}
const schema = new Schema<IInsuranceEvent>({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    car: {
        type: ObjectId,
        ref: 'Car',
        required: true
    },
    images: [{ type: String, required: true }]
});
export const InsuranceEvent = model<IInsuranceEvent>('InsuranceEvent', schema);