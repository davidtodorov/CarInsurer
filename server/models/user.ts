import { Schema, model } from 'mongoose';

const { String, Number } = Schema.Types;

export interface IUser {
    firstName: String;
    middleName: String;
    lastName: String;
    identityNumber: Schema.Types.Number

}
const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    identityNumber: { type: Number, required: true}
});

export default model<IUser>('User', UserSchema);