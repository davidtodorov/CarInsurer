import { ICar } from "../../models/car";
import { IUser } from "../../models/user";

export default interface ICarCreate {
    plateNumber: ICar['plateNumber'],
    productionYear: ICar['productionYear'],
    owner: IUser['_id']
}