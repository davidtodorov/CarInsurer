import { Schema, model, ObjectId } from 'mongoose';
import { ICar } from './car';
import { IInstallment } from './installment';

const { String, Number, Date, ObjectId } = Schema.Types;

export enum InstallmentType {
    Yearly = 'Yearly',
    HalfYearly = 'HalfYearly',
    Quarterly = 'Quarterly'
}

export interface IInsurance {
    startDate: Date;
    endDate: Date;
    cost: Schema.Types.Number;
    dueAmount: Schema.Types.Number;
    installmentType: String;
    installments: IInstallment[];
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
    installments: [{
        type: ObjectId,
        ref: 'Installment'

    }],
    car: { type: ObjectId, ref: 'Car', required: false },
});
export const Insurance = model<IInsurance>('Insurance', insuranceSchema);