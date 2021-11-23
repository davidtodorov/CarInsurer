export default interface IInsuranceForm {
    insurance: {
        startDate: Date;
        cost: Number;
        dueAmount: Number;
        installmentType: String
    },
    car: {
        plateNumber: String,
        productionDate: Date
    },
    owner: {
        firstName: String,
        lastName: String,
        identityNumber: String
    }
}