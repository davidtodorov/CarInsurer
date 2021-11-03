import { ClientSession } from "mongoose";
import IInsuranceCreate from "../interfaces/insurance/IInsuranceCreate";
import { InsuranceModel } from "../models/insurance";
import carService from "./carService";
import userService from "./userService";

export async function creaeteInsurance(insuranceCreateModel: IInsuranceCreate, session: ClientSession) {
    const createdCar = await carService.createCar(insuranceCreateModel.car, session);
    let insurance = insuranceCreateModel;
    insurance.car = createdCar['_id'];

    return new InsuranceModel(insurance).save({ session });
}

export default {
    creaeteInsurance
}