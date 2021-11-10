import { ClientSession } from 'mongoose';
import { app } from '..';
import IUserCreate from '../interfaces/user/IUserCreate';
import { User } from '../models/user';

export default class UserService {
    constructor() {
        
    }

    public async createUser(user: IUserCreate, session: ClientSession) {
        return new User(user).save({ session });
    }
}