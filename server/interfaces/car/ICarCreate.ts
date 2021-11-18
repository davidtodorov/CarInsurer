import { ICar } from "../../models/car";
import { IUser } from "../../models/user";
import IUserCreate from "../user/IUserCreate";

export default interface ICarCreate {
    plateNumber: ICar['plateNumber'];
    productionDate: ICar['productionDate'];
    owner: IUserCreate;
}