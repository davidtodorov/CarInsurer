import { expect, assert, should } from "chai";
import { IUser, User } from "../models/user";
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

describe('user service', () => {

     it("should not add user with Identity Number's length != 10", async () => {
          //arrange  
          let user = { firstName: "Gosho", lastName: "Petrov", identityNumber: 123 } as unknown as IUser;
          let session = await User.startSession();

          //act
          try {
               await serviceContainer.userService.createUser({ firstName: 'Gosho', lastName: 'Goshov', identityNumber: 123123 } as unknown as IUser, session);
          } catch(err: any) {
               //assert
               expect(err.message).to.be.equal("Identity number's length should be 10!");
          }
     });

     it("should not add user with invalid Identity Number", async () => {
          //arrange  
          let user = { firstName: "Gosho", lastName: "Petrov", identityNumber: 1111111111 } as unknown as IUser;
          let session = await User.startSession();

          //act
          try {
               await serviceContainer.userService.createUser(user as unknown as IUser, session);
          } catch(err: any) {
               //assert
               expect(err.message).to.be.equal(user.identityNumber + " is not valid identity number!");
          }
     });


     it("should not add user with duplicated identity number", async () => {
          //arrange 
          await User.create({ firstName: 'Pesho', lastName: 'Peshov', identityNumber: 123123 });
          let session = await User.startSession();

          //act
          try {
               await serviceContainer.userService.createUser({ firstName: 'Gosho', lastName: 'Goshov', identityNumber: 123123 } as unknown as IUser, session);
          } catch (ex) {
               //assert
               expect(ex).to.be.an('error');
          }

     });
});
