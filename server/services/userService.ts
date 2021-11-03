import { ClientSession } from 'mongoose';
import IUserCreate from '../interfaces/user/IUserCreate';
import { User } from '../models/user';

function createUser(user: IUserCreate, session: ClientSession) {
    return new User(user).save({ session });
}

export default {
    createUser
}