import { Schema, model, ObjectId } from 'mongoose';

const { String, Number, Date, ObjectId } = Schema.Types;

export interface IInsurance {
    number: String;
    startDate: Date;
    carYear: Date;
    cost: Schema.Types.Number;
    user: ObjectId

}
const InsuranceSchema = new Schema<IInsurance>({
    number: { type: String, required: true },
    startDate: { type: Date, required: true},
    carYear: { type: Date, required: true},
    cost: { type: Number, required: true},
    user: { type: ObjectId, required: true, ref: 'User'},
});

export default model<IInsurance>('Insurance', InsuranceSchema);