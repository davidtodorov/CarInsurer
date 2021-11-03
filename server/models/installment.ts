import { Schema, model, ObjectId } from 'mongoose';
import { ICar } from './car';

const { String, Number, Date, ObjectId, Boolean } = Schema.Types;

export interface IInstallment {
    startDate: Date;
    endDate: Date;
    isPaid: Boolean

}
const insuranceSchema = new Schema<IInstallment>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isPaid: { type: Boolean }
});
export const Installment = model<IInstallment>('Installment', insuranceSchema);