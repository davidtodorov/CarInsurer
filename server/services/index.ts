import CarService from "./carService";
import EventService from "./eventService";
import InstallmentService from "./instalmentsService";
import InsuranceService from "./insuranceService";
import InsuranceWorkflow from "./insuranceWorkflow";
import UserService from "./userService";

export class ServiceContainer {
    public userService: UserService;
    public carService: CarService;
    public insuranceService: InsuranceService;
    public insuranceWorkflow: InsuranceWorkflow;
    public installmentService: InstallmentService;
    public eventService: EventService;

    constructor() {
        this.userService = new UserService();
        this.carService = new CarService();
        this.insuranceService = new InsuranceService();
        this.insuranceWorkflow = new InsuranceWorkflow(this.insuranceService, this.carService, this.userService);
        this.installmentService = new InstallmentService();
        this.eventService = new EventService();
    }

    public init() {

    }
}
