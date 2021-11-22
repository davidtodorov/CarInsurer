import { expect, assert, should } from "chai";
import { Car, ICar } from "../models/car";
import { User } from "../models/user";
import { ServiceContainer } from "../services";
import { clearDatabase, closeDatabase, connect } from "./dbHandler";

let serviceContainer: ServiceContainer;

before(async () => {
     await connect();
     serviceContainer = new ServiceContainer();
});

afterEach(async () => {
     await clearDatabase();
});

after(async () => {
     await closeDatabase();
});


describe('car service', () => {
     it("should throw error if plate's number is invalid", async () => {
          //arrange  
          let owner = await User.create({ firstName: "Pesho", lastName: "Pesho", identityNumber: 9405109356})
          let car = { owner: owner.id, plateNumber: 'CB1234AA', productionDate: new Date()} as unknown as ICar;
          let session = await Car.startSession();

          //act
          try {
               await serviceContainer.carService.createCar(car, session);
          } catch(err: any) {
               //assert
               expect(err.message).to.be.equal(`Car with plate number: ${car.plateNumber} already exits!`);
          }
     });

     it("should throw error if plate number is existing", async () => {
          //arrange  
          let owner = await User.create({ firstName: "Pesho", lastName: "Pesho", identityNumber: 9405109356})
          let car = { owner: owner.id, plateNumber: 'CB1234AA', productionDate: new Date()} as unknown as ICar;
          await Car.create(car);
          let session = await Car.startSession();

          //act
          try {
               await serviceContainer.carService.createCar(car, session);
          } catch(err: any) {
               //assert
               expect(err.message).to.be.equal(`Car with plate number: ${car.plateNumber} already exits!`);
          }
     });
});
