import { model, Schema, Types } from 'mongoose';
import { IUser } from './user';

const { String, Date, ObjectId } = Schema.Types;

export interface ICar {
    _id: Types.ObjectId ,
    plateNumber: String;
    productionDate: Date;
    owner: IUser['_id'];
}

const carSchema = new Schema<ICar>({
    plateNumber: {
        type: String, required: true,
        validate: {
            validator: function (v: any) {
                return /^(E|A|B|BT|BH|BP|EB|TX|K|KH|OB|M|PA|PK|EH|PB|PP|P|CC|CH|CO|C|CA|CB|CT|T|X|H|Y)(\d{4})([A|B|E|K|M|H|O|P|C|T|Y|X]{2})$/.test(v);
            },
            message: props => `${props.value} is not a valid plate number!`
        },
    },
    productionDate: { type: Date, required: true },
    owner: { type: ObjectId, ref: 'User', required: true },
});

export const Car = model<ICar>('Car', carSchema);