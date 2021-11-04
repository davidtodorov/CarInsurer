import { model, Schema, Document, ObjectId } from 'mongoose';
import { IUser } from './user';

const { String, Number, Date, ObjectId } = Schema.Types;

export interface ICar extends Document{
    plateNumber: String;
    productionYear: Date;
    owner: IUser['id'];
}

const carSchema =  new Schema<ICar>({
    plateNumber: { type: String, required: true },
    productionYear: { type: Date, required: true},
    owner: { type: ObjectId, ref: 'User',  required: true },
});

export const Car = model<ICar>('Car', carSchema);