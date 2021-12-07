import { Schema, model, Types } from 'mongoose';
import { IInsurance } from './insurance';

const { Date, ObjectId, Boolean } = Schema.Types;

export interface IInstallment {
    _id: Types.ObjectId,
    startDate: Date;
    endDate: Date;
    isPaid: Boolean,
    insurance: IInsurance['_id']

}
const schema = new Schema<IInstallment>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    insurance: {
        type: ObjectId,
        ref: 'Insurance',
        required: true
    }
});
export const Installment = model<IInstallment>('Installment', schema);