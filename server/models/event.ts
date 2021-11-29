import { Schema, model, ObjectId } from 'mongoose';
import { ICar } from './car';
import { IInsurance } from './insurance';

const { String, Date, ObjectId, Buffer } = Schema.Types;

export interface IEvent {
    _id: String,
    date: Date;
    description: String;
    car: ICar['id'];
    image: String

}
const schema = new Schema<IEvent>({
    date: { type: Date },
    description: { type: String },
    car: {
        type: ObjectId,
        ref: 'Car'
        
    },
    image: { type: String }
});
export const Evenet = model<IEvent>('Event', schema);