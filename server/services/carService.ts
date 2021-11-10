import { ClientSession } from "mongoose";
import ICarCreate from "../interfaces/car/ICarCreate";
import { Car } from "../models/car";
import UserService from "./userService";

export default class CarService {
    constructor(private userService: UserService) {}
    
    public async createCar(carCreateModel: ICarCreate, session: ClientSession) {
        const owner = await this.userService.createUser(carCreateModel.owner, session);
        let car = carCreateModel;
        car.owner = owner.id;
        return new Car(car).save({ session });
    }
}