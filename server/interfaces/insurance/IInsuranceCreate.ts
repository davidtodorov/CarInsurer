import { ICar } from "../../models/car";
import { IInsurance } from "../../models/insurance";

export default interface ICreateInsurance {
    startDate: IInsurance['startDate'];
    cost: IInsurance['cost'];
    dueAmount: IInsurance['dueAmount'];
    installmentType: IInsurance['installmentType'];
    car: ICar['_id'];
}