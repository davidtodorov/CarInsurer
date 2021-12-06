import { ClientSession } from "mongoose";
import { ICar } from "../models/car";
import { IInsurance } from "../models/insurance";
import { IUser } from "../models/user";
import CarService from "./carService";
import InsuranceService from "./insuranceService";
import UserService from "./userService";

export interface IInsuraceWorkflow {
    insurance: IInsurance,
    car: ICar,
    owner: IUser
}

export default class InsuranceWorkflow {
    constructor(private insuraceService: InsuranceService, private carService: CarService, private userService: UserService) {
        
    }

    public async create(model: IInsuraceWorkflow, session: ClientSession){
        const owner = await this.userService.getOrCreateUser(model.owner, session);
        
        model.car.owner = owner._id;
        const car = await this.carService.createCar(model.car, session);

        model.insurance.car = car._id;
        const insurance = await this.insuraceService.createInsurance(model.insurance, session);

        return insurance;
    }
}