import { User } from "../models/user";
import CarService from "./carService";
import InsuranceService from "./insuranceService";
import UserService from "./userService";

export class ServiceContainer {
    public userService: UserService;
    public carService: CarService;
    public insuranceService: InsuranceService;
    
    constructor() {
        this.userService = new UserService();
        this.carService = new CarService(this.userService);
        this.insuranceService = new InsuranceService(this.carService);
    }

    public init(){

    }
}
