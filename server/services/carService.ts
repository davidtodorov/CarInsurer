import { ClientSession } from "mongoose";
import { Car, ICar } from "../models/car";

export default class CarService {
    constructor() {}
    
    public async createCar(model: ICar, session: ClientSession) {
        const car = await Car.findOne({ plateNumber: model.plateNumber })
        if (car) {
            throw new Error(`Car with plate number: ${model.plateNumber} already exits!`)
        }
        return new Car(model).save({ session });
    }
}