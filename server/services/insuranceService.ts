import { ClientSession } from "mongoose";
import moment from 'moment'
import { IInsurance, InstallmentType, Insurance } from "../models/insurance";
import { IInstallment, Installment } from "../models/installment";

export default class InsuranceService {
    constructor() {
        
    }

    public async createInsurance(model: IInsurance, session: ClientSession) {
        model.startDate = this.getStartDate(model);
        
        let insurance = new Insurance({
            ...model,
            endDate: this.getEndDate(model),
        });
    
        insurance.installments = await this.getInstallments(insurance, session);
        return new Insurance(insurance).save({ session });
    }

    private getStartDate(model: IInsurance): Date {
        const startDate = moment(model.startDate).startOf('day').toDate();
        return startDate;
    }

    private getEndDate(model: IInsurance): Date {
        const endDate = moment(model.startDate).add(1, 'years').subtract(1, 'days').endOf('day').toDate();
        return endDate;
    }

    private async getInstallments(insurance: IInsurance, session: ClientSession): Promise<IInstallment['id'][]> {
        let ids: IInstallment['id'][] = [];
    
        switch (insurance.installmentType) {
            case InstallmentType.Yearly: {
                let installment = await new Installment({ insurance: insurance.id, startDate: insurance.startDate, endDate: insurance.endDate }).save({ session });
                ids.push(installment.id);
                break;
            }   
            case InstallmentType.HalfYearly: {
                for (let i = 0; i < 2; i++) {
                    const newStartDate = moment(insurance.startDate).add(i * 6, 'months').toDate();
                    const newEndDate = moment(insurance.startDate).add((i + 1) * 6, 'months').subtract(1, 'days').endOf('day').toDate();
                    let installment = await new Installment({ insurance: insurance.id, startDate: newStartDate, endDate: newEndDate }).save({ session });
                    ids.push(installment.id);
                }
                break;
            }
            case InstallmentType.Quarterly: {
                for (let i = 0; i < 4; i++) {
                    const newStartDate = moment(insurance.startDate).add(i, 'quarters').toDate();
                    const newEndDate = moment(insurance.startDate).add(i + 1, 'quarters').subtract(1, 'days').endOf('day').toDate();
                    let installment = new Installment({ insurance: insurance.id, startDate: newStartDate, endDate: newEndDate });
                    await installment.save({ session });
                    ids.push(installment.id);
                }
                break;
            }
            default:
                break;
        }
    
        return ids;
    }
}
