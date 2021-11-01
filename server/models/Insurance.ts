import { Schema, model, ObjectId } from 'mongoose';
import { ICar } from './car';

const { String, Number, Date, ObjectId } = Schema.Types;

export enum InstallmentType {
    Yearly = 'Yearly',
    HalfYearly = 'HalfYearly',
    Quarterly = 'Quarterly'
}

export interface IInsurance {
    startDate: Date;
    cost: Schema.Types.Number;
    dueAmount: Schema.Types.Number;
    installmentType: String
    car: ICar['_id'];

}
const insuranceSchema = new Schema<IInsurance>({
    startDate: { type: Date, required: true },
    cost: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    installmentType: {
        type: String,
        enum: Object.values(InstallmentType),
        required: true
    },
    car: { type: ObjectId, ref: 'Car', required: false },
});
export const InsuranceModel = model<IInsurance>('Insurance', insuranceSchema);