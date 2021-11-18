import { ClientSession } from 'mongoose';
import { app } from '..';
import IUserCreate from '../interfaces/user/IUserCreate';
import { IUser, User } from '../models/user';

export default class UserService {
    constructor() {
        
    }

    public async createUser(user: IUser, session: ClientSession) {
        let existingUser = await User.findOne({ identityNumber: user.identityNumber });
        if (existingUser) {
            throw new Error("User with identity number: " + user.identityNumber + " already exists!");
        }
        return new User(user).save({ session });
    }
}