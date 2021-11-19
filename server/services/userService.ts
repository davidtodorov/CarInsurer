import { ClientSession } from 'mongoose';
import { app } from '..';
import IUserCreate from '../interfaces/user/IUserCreate';
import { IUser, User } from '../models/user';

export default class UserService {
    constructor() {

    }

    public async createUser(user: IUser, session: ClientSession) {
        this.checkIsValidIdentityNumber(user.identityNumber)
        await this.checkForExistingUser(user.identityNumber);

        return new User(user).save({ session });
    }

    private checkIsValidIdentityNumber(idNumber: Number) {
        let idNumberString = idNumber.toString();

        if (idNumberString.length !== 10) {
            throw new Error("Identity number's length should be 10!")
        }

        let sum = 0;
        for (let i = 0; i < idNumberString.length - 1; i++) {
            const digit: number = parseInt(idNumberString[i]);
            sum += digit * this.multiplier[i];
        }

        const validDigit = sum % 11;
        if (parseInt(idNumberString[9]) !== validDigit) {
            throw new Error(`${idNumber} is not valid identity number!`);
        }
    }

    private async checkForExistingUser(identityNumber: Number) {
        let existingUser = await User.findOne({ identityNumber });
        if (existingUser) {
            throw new Error("User with identity number: " + identityNumber + " already exists!");
        }
    }

    private multiplier: number[] = [2, 4, 8, 5, 10, 9, 7, 3, 6];
}