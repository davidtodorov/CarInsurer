import { ClientSession } from "mongoose";
import moment from 'moment'
import { IInsurance, InstallmentType, Insurance } from "../models/insurance";
import { IInstallment, Installment } from "../models/installment";
import { Car, ICar } from "../models/car";
import { User } from "../models/user";
import { InsuranceEvent } from "../models/event";

export default class InsuranceService {
    constructor() {

    }

    public async createInsurance(model: IInsurance, session: ClientSession): Promise<IInsurance> {
        model.startDate = this.getStartDate(model);

        let insurance = new Insurance({
            ...model,
            endDate: this.getEndDate(model),
            dueAmount: this.getDueAmount(model)
        });

        insurance.installments = await this.getInstallments(insurance, session);
        return new Insurance(insurance).save({ session });
    }

    public async updateInsurance(model: IInsurance, session: ClientSession): Promise<IInsurance> {
        model.startDate = this.getStartDate(model);

        let insurance = new Insurance({
            ...model,
            endDate: this.getEndDate(model),
            dueAmount: this.getDueAmount(model)
        });

        insurance.installments = await this.getInstallments(insurance, session);
        return new Insurance(insurance).save({ session });
    }

    public async deleteInsurance(id: string) {
        let insurance = await Insurance.findOne({ _id: id }).populate('car');
        let car = insurance?.car as any as ICar;
        let carId = car._id;
        let userId = car.owner;
        await User.deleteOne({ _id: userId });
        await Car.deleteOne({ _id: carId });
        await Installment.deleteMany({ _id: { $in: insurance?.installments || [] } });
        await InsuranceEvent.deleteMany({ insurance: id });
        return await Insurance.deleteOne({ _id: id })
    }

    private getDueAmount(model: IInsurance): number {
        let dueAmount = 0;
        if (model.installmentType === InstallmentType.Yearly) {
            dueAmount = model.cost
        }
        else if (model.installmentType === InstallmentType.HalfYearly) {
            dueAmount = model.cost / 2;
        }
        else if (model.installmentType === InstallmentType.Quarterly) {
            dueAmount = model.cost / 4
        }
        
        return dueAmount;
    }

    private getStartDate(model: IInsurance): Date {
        const startDate = moment(model.startDate).startOf('day').toDate();
        return startDate;
    }

    private getEndDate(model: IInsurance): Date {
        const endDate = moment(model.startDate).add(1, 'years').subtract(1, 'days').endOf('day').toDate();
        return endDate;
    }

    private async getInstallments(insurance: IInsurance, session: ClientSession): Promise<IInstallment['_id'][]> {
        let ids: IInstallment['_id'][] = [];

        switch (insurance.installmentType) {
            case InstallmentType.Yearly: {
                let installment = await new Installment({ insurance: insurance._id, startDate: insurance.startDate, endDate: insurance.endDate }).save({ session });
                ids.push(installment.id);
                break;
            }
            case InstallmentType.HalfYearly: {
                for (let i = 0; i < 2; i++) {
                    const newStartDate = moment(insurance.startDate).add(i * 6, 'months').toDate();
                    const newEndDate = moment(insurance.startDate).add((i + 1) * 6, 'months').subtract(1, 'days').endOf('day').toDate();
                    let installment = await new Installment({ insurance: insurance._id, startDate: newStartDate, endDate: newEndDate }).save({ session });
                    ids.push(installment._id);
                }
                break;
            }
            case InstallmentType.Quarterly: {
                for (let i = 0; i < 4; i++) {
                    const newStartDate = moment(insurance.startDate).add(i, 'quarters').toDate();
                    const newEndDate = moment(insurance.startDate).add(i + 1, 'quarters').subtract(1, 'days').endOf('day').toDate();
                    let installment = new Installment({ insurance: insurance._id, startDate: newStartDate, endDate: newEndDate });
                    await installment.save({ session });
                    ids.push(installment._id);
                }
                break;
            }
            default:
                break;
        }

        return ids;
    }
}
