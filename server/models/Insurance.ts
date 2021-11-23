const moment = require('moment');
import { Schema, model, ObjectId, Document } from 'mongoose';
import { ICar } from './car';
import { IInstallment, Installment } from './installment';

const { String, Number, Date, ObjectId } = Schema.Types;

export enum InstallmentType {
    Yearly = 'Yearly',
    HalfYearly = 'HalfYearly',
    Quarterly = 'Quarterly'
}

export interface IInsurance {
    id: String,
    startDate: Date;
    endDate: Date;
    cost: number;
    dueAmount: number;
    installmentType: String;
    installments: IInstallment['id'][];
    car: ICar['id'];

}
const insuranceSchema = new Schema<IInsurance>({
    startDate: { type: Date, required: true },
    endDate: { type: Date },
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
    car: { type: ObjectId, ref: 'Car', required: [true, "Car is required!"] },
});

export const Insurance = model<IInsurance>('Insurance', insuranceSchema);