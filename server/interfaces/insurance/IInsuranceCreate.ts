import { ICar } from "../../models/car";
import { IInsurance } from "../../models/insurance";
import ICarCreate from "../car/ICarCreate";

export default interface ICreateInsurance {
    startDate: IInsurance['startDate'];
    cost: IInsurance['cost'];
    dueAmount: IInsurance['dueAmount'];
    installmentType: IInsurance['installmentType'];
    car: ICarCreate
}