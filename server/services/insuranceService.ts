import IInsuranceCreate from "../interfaces/insurance/IInsuranceCreate";
import { InsuranceModel } from "../models/insurance";

export function creaeteInsurance(insurance: IInsuranceCreate){
    return InsuranceModel.create(insurance);
}

export default {
    creaeteInsurance
}