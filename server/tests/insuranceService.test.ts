import { expect, assert, should } from "chai";
import { after } from "mocha";
import moment from "moment";
import { Car, ICar } from "../models/car";
import { IInsurance, InstallmentType, Insurance } from "../models/insurance";
import { IUser, User } from "../models/user";
import { ServiceContainer } from "../services";
import { clearDatabase, closeDatabase, connect } from "./dbHandler";

let serviceContainer: ServiceContainer;

before(async () => {
     serviceContainer = new ServiceContainer();
});

describe('insurance service', () => {

     it("should throw error if car is not provided", async () => {
          //arrange  
          let owner = await User.create({ firstName: "Gosho", lastName: "Petrov", identityNumber: 8212104507 });
          let session = await Insurance.startSession();

          let insurance = {
               cost: 300,
               installmentType: InstallmentType.Yearly as String,
          } as IInsurance

          //act
          try {
               await serviceContainer.insuranceService.createInsurance(insurance, session);
          } catch (err: any) {
               //assert
               expect(err.message).to.be.equal("Insurance validation failed: car: Car is required!");
          }
     });

     it("should calculate end date correctly", async () => {
          //arrange  
          let owner = await User.create({ firstName: "Gosho", lastName: "Petrov", identityNumber: 8212104507 });
          let car = await Car.create({ owner: owner.id, plateNumber: 'CB1234AA', productionDate: new Date() });
          let session = await Insurance.startSession();

          let insurance = {
               car: car.id,
               startDate: new Date(2021, 8, 6),
               cost: 300,
               installmentType: InstallmentType.Yearly as String,
          } as IInsurance

          let expectedEndDate = moment(insurance.startDate).add(1, 'years').subtract(1, 'days').endOf('day').toDate();

          //act
          let createdInsurance = await serviceContainer.insuranceService.createInsurance(insurance, session);

          //assert
          expect(createdInsurance.endDate.toString()).to.be.equal(expectedEndDate.toString());
     });

     describe("should calculate due amount correctly", async () => {
          //arrange  
          let owner;
          let car;
          let cost: any;
          let insurance: any;
          let session: any;
          
          beforeEach(async () => {
               owner = await User.create({ firstName: "Gosho", lastName: "Petrov", identityNumber: 8212104507 });
               car = await Car.create({ owner: owner.id, plateNumber: 'CB1234AA', productionDate: new Date() });
               cost = 300;
               insurance = {
                    car: car.id,
                    startDate: new Date(2021, 8, 6),
                    cost,
               } as IInsurance
               
               session = await Insurance.startSession();
          })

          it("when installment type is Yearly ", async () => {
               insurance.installmentType = InstallmentType.Yearly as String;
               
               //act
               let createdInsurance = await serviceContainer.insuranceService.createInsurance(insurance, session);
               
               //assert
               expect(createdInsurance.dueAmount).to.be.equal(cost);
          });

          it("when installment type is Half Yearly ", async () => {
               insurance.installmentType = InstallmentType.HalfYearly as String;
               
               //act
               let createdInsurance = await serviceContainer.insuranceService.createInsurance(insurance, session);
               
               //assert
               expect(createdInsurance.dueAmount).to.be.equal(cost/2);
          });

          it("when installment type is Quarterly ", async () => {
               insurance.installmentType = InstallmentType.Quarterly as String;
               
               //act
               let createdInsurance = await serviceContainer.insuranceService.createInsurance(insurance, session);
               
               //assert
               expect(createdInsurance.dueAmount).to.be.equal(cost/4);
          });
     });
});
