import IUserCreate from '../interfaces/user/IUserCreate';
import { UserModel } from '../models/user';

function createUser(user: IUserCreate) {
    const { firstName, middleName, lastName, identityNumber } = user;
    return UserModel.create({ middleName, lastName, identityNumber });
}

export default {
    createUser
}