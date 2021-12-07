import { Schema, model, Types } from 'mongoose';

const { String, Number } = Schema.Types;

export interface IUser {
    _id: Types.ObjectId,
    firstName: String;
    middleName?: String;
    lastName: String;
    identityNumber: Number
}
const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    identityNumber: {
        type: Number, required: true,
    }
});

export const User = model<IUser>('User', UserSchema);