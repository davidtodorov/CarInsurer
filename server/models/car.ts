import { model, Schema, Document, ObjectId } from 'mongoose';
import { IUser } from './user';

const { String, Number, Date, ObjectId } = Schema.Types;

export interface ICar extends Document {
    plateNumber: String;
    productionYear: Date;
    owner: IUser['id'];
}

const carSchema = new Schema<ICar>({
    plateNumber: {
        type: String, required: true,
        validate: {
            validator: function (v: any) {
                return /^(E|A|B|BT|BH|BP|EB|TX|K|KH|OB|M|PA|PK|EH|PB|PP|P|CC|CH|CO|C|CA|CB|CT|T|X|H|Y)(\d{4})([A|B|E|K|M|H|O|P|C|T|Y|X]{2})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    productionYear: { type: Date, required: true },
    owner: { type: ObjectId, ref: 'User', required: true },
});

export const Car = model<ICar>('Car', carSchema);