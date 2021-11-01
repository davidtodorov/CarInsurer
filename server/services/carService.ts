import ICarCreate from "../interfaces/car/ICarCreate";
import { CarModel } from "../models/car";

async function createCar(car: ICarCreate){
     return CarModel.create(car);
}

export default {
    createCar
}