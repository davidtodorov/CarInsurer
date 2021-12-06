export default interface Insurance {
    _id: string,
    startDate: Date;
    endDate: Date;
    cost: number;
    dueAmount: number;
    installmentType: string;
    installments: string[];
    car: {
        plateNumber: string,
        productionDate: Date,
        owner: {
            firstName: string,
            lastName: string,
            identityNumber: string
        }
    },
    events: string[];
}