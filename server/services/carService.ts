import { ClientSession } from "mongoose";
import ICarCreate from "../interfaces/car/ICarCreate";
import { Car } from "../models/car";
import userService from "./userService";

async function createCar(carCreateModel: ICarCreate, session: ClientSession) {
    const owner = await userService.createUser(carCreateModel.owner, session);
    let car = carCreateModel;
    car.owner = owner._id;
    return new Car(car).save({ session });
}

export default {
    createCar
}