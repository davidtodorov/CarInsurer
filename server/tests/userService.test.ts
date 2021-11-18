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
     it("should not add user with duplicated identity number", async () => {
          //arrange 
          await User.create({ firstName: 'Pesho', lastName: 'Peshov', identityNumber: 123123 });
          let session = await User.startSession();

          //act
          try {
               await await serviceContainer.userService.createUser({ firstName: 'Gosho', lastName: 'Goshov', identityNumber: 123123 } as unknown as IUser, session);
          } catch (ex) {
               //assert
               expect(ex).to.be.an('error');
          }

     });
});
