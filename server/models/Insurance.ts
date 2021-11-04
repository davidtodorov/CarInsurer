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

export interface IInsurance extends Document {
    startDate: Date;
    endDate: Date;
    cost: Schema.Types.Number;
    dueAmount: Schema.Types.Number;
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
    car: { type: ObjectId, ref: 'Car', required: false },
});

insuranceSchema.pre('save', async function (next) {
    const startDate = moment(this.startDate).startOf('day').toDate();
    this.startDate = startDate;

    const endDate = moment(this.startDate).add(1, 'years').endOf('day').toDate();
    this.endDate = endDate;

    switch (this.installmentType) {
        case InstallmentType.Yearly:
            await Installment.create({ insurance: this.id, startDate, endDate })
            break;
        case InstallmentType.HalfYearly:
            await Installment.create({ insurance: this.id, startDate, endDate: moment(endDate).add(6, 'months').toDate() })
            break;
        case InstallmentType.Quarterly:
            for (let i = 0; i < 4; i++) {
                let newStartDate = moment(startDate).add(i, 'quarters').toDate();
                if (i > 0) {
                    newStartDate = moment(newStartDate).add(1, 'days').startOf('day').toDate();
                }
                const newEndDate = moment(startDate).add(i + 1, 'quarters').endOf('day').toDate();
                const installment = await Installment.create({ insurance: this.id, startDate: newStartDate, endDate: newEndDate });
                this.installments.push(installment.id);
            }
            break;
        default:
            next();
            break;
    }
})

export const Insurance = model<IInsurance>('Insurance', insuranceSchema);