import { IUser } from "../../models/user";

export default interface IUserCreate {
    firstName: IUser['firstName'],
    middleName: IUser['middleName']
    lastName: IUser['lastName']
    identityNumber: IUser['identityNumber']
}