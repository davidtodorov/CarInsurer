import { ClientSession } from "mongoose";
import { Car, ICar } from "../models/car";

export default class CarService {
    constructor() {}
    
    public async createCar(carCreateModel: ICar, session: ClientSession) {
        let car = carCreateModel;
        return new Car(car).save({ session });
    }
}