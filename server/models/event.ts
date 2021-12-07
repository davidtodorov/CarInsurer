import { Schema, model, Types } from 'mongoose';
import { IInsurance } from './insurance';

const { String, Date, ObjectId, Buffer } = Schema.Types;

export interface IInsuranceEvent {
    _id: Types.ObjectId,
    date: Date;
    description: String;
    images: String[]
    insurance: IInsurance['_id'];
}
const schema = new Schema<IInsuranceEvent>({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    insurance: {
        type: ObjectId,
        ref: 'Insurance',
        required: true
    }
});

export const InsuranceEvent = model<IInsuranceEvent>('InsuranceEvent', schema);