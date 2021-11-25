import { Car, ICar } from "../models/car";
import { IInstallment, Installment } from "../models/installment";

export default class CarService {
    constructor() {}
    
    public async getInstallments(insuranceId: string): Promise<IInstallment[]> {
        let installments = await Installment.find({ insurance: insuranceId});
        return installments;
    }
}