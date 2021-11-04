import { Schema, model, ObjectId, Document } from 'mongoose';
import { IInsurance } from './insurance';

const { String, Number, Date, ObjectId, Boolean } = Schema.Types;

export interface IInstallment extends Document{
    startDate: Date;
    endDate: Date;
    isPaid: Boolean,
    insurance: IInsurance['id']

}
const schema = new Schema<IInstallment>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isPaid: { type: Boolean },
    insurance: {
        type: ObjectId,
        ref: 'Insurance',
        required: true
    }
});
export const Installment = model<IInstallment>('Installment', schema);