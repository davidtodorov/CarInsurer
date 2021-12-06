const moment = require('moment');
import { Schema, model, ObjectId } from 'mongoose';
import { ICar } from './car';
import { IInsuranceEvent } from './event';
import { IInstallment, Installment } from './installment';

const { String, Number, Date, ObjectId } = Schema.Types;

export enum InstallmentType {
    Yearly = 'Yearly',
    HalfYearly = 'HalfYearly',
    Quarterly = 'Quarterly'
}

export interface IInsurance {
    _id: String,
    startDate: Date;
    endDate: Date;
    cost: number;
    dueAmount: number;
    installmentType: String;
    installments: IInstallment['_id'][];
    car: ICar['_id'];
    events: IInsuranceEvent['_id'][];
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
    events: [{
        type: ObjectId,
        ref: 'InsuranceEvent'
    }]
});

export const Insurance = model<IInsurance>('Insurance', insuranceSchema);