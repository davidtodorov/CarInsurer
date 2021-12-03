import moment from "moment";
import { Car, ICar } from "../models/car";
import { IInstallment, Installment } from "../models/installment";

export default class InstallmentService {
    constructor() { 
    }

    public async getInstallments(id: string): Promise<IInstallment[]> {
        let installments = await Installment.find(id ? { _id: id } : {});
        return installments;
    }

    public async updateInstallment(model: IInstallment) {
        if (model.isPaid === true) {
            let installments = await Installment.find({ insurance: model.insurance });
            let previousInstallments = installments.filter(x => x.endDate < moment(model.startDate).toDate()).sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
            if (previousInstallments.length > 0 && previousInstallments[0].isPaid === false) {
                throw new Error("Previous installment must be paid!");
            }
        }
        const result = await Installment.updateOne({ _id: model._id }, model);
        return result;
    }
}