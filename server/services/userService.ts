import { ClientSession } from 'mongoose';
import IUserCreate from '../interfaces/user/IUserCreate';
import { UserModel } from '../models/user';

function createUser(user: IUserCreate, session: ClientSession) {
    return new UserModel(user).save( { session });
}

export default {
    createUser
}