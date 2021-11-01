import IInsuranceCreate from "../interfaces/insurance/IInsuranceCreate";
import { InsuranceModel } from "../models/insurance";

export function creaeteInsurance(insurance: IInsuranceCreate){
    const { startDate, cost, dueAmount, installmentType } = insurance;
    return InsuranceModel.create({ startDate, cost, dueAmount, installmentType, });
}

export default {
    creaeteInsurance
}