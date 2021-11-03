import { Schema, Document, model } from 'mongoose';

const { String, Number } = Schema.Types;

export interface IUser extends Document{
    firstName: String;
    middleName: String;
    lastName: String;
    identityNumber: Schema.Types.Number
}
const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    identityNumber: { type: Number, required: true }
});

export const User = model<IUser>('User', UserSchema);