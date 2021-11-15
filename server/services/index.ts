import { User } from "../models/user";
import CarService from "./carService";
import InsuranceService from "./insuranceService";
import InsuranceWorkflow from "./insuranceWorkflow";
import UserService from "./userService";

export class ServiceContainer {
    public userService: UserService;
    public carService: CarService;
    public insuranceService: InsuranceService;
    public insuranceWorkflow: InsuranceWorkflow
    
    constructor() {
        this.userService = new UserService();
        this.carService = new CarService();
        this.insuranceService = new InsuranceService();
        this.insuranceWorkflow = new InsuranceWorkflow(this.insuranceService, this.carService, this.userService);
    }

    public init(){

    }
}
