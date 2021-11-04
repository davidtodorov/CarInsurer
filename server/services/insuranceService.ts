import { ClientSession } from "mongoose";
import IInsuranceCreate from "../interfaces/insurance/IInsuranceCreate";
import { Insurance } from "../models/insurance";
import carService from "./carService";

export async function creaeteInsurance(insuranceCreateModel: IInsuranceCreate, session: ClientSession) {
    const createdCar = await carService.createCar(insuranceCreateModel.car, session);
    let insurance = insuranceCreateModel;
    insurance.car = createdCar.id;

    return new Insurance(insurance).save({ session });
}

export default {
    creaeteInsurance
}