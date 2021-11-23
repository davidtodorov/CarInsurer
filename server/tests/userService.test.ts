import { expect, assert, should } from "chai";
import { after } from "mocha";
import { IUser, User } from "../models/user";
import { ServiceContainer } from "../services";
import { clearDatabase, closeDatabase, connect } from "./dbHandler";

let serviceContainer: ServiceContainer;

before(async () => {
     serviceContainer = new ServiceContainer();
});

describe('user service', () => {

     it("should throw error if identity number's length != 10", async () => {
          //arrange  
          let user = { firstName: "Gosho", lastName: "Petrov", identityNumber: 123 } as unknown as IUser;
          let session = await User.startSession();

          //act
          try {
               await serviceContainer.userService.getOrCreateUser({ firstName: 'Gosho', lastName: 'Goshov', identityNumber: 123123 } as unknown as IUser, session);
          } catch (err: any) {
               //assert
               expect(err.message).to.be.equal("Identity number's length should be 10!");
          }
     });

     it("should throw error if identity number is invalid", async () => {
          //arrange  
          let user = { firstName: "Gosho", lastName: "Petrov", identityNumber: 1111111111 } as unknown as IUser;
          let session = await User.startSession();

          //act
          try {
               await serviceContainer.userService.getOrCreateUser(user as unknown as IUser, session);
          } catch (err: any) {
               //assert
               expect(err.message).to.be.equal(user.identityNumber + " is not valid identity number!");
          }
     });

     it("should get user if already exists", async () => {
          //arrange 
          let user = await User.create({ firstName: 'Pesho', lastName: 'Peshov', identityNumber: 8212104507 });
          let session = await User.startSession();

          let userFromService = await serviceContainer.userService.getOrCreateUser({ firstName: 'Gosho', lastName: 'Goshov', identityNumber: 8212104507 } as unknown as IUser, session);
          expect(user.identityNumber).to.be.equal(userFromService.identityNumber);
     });
});
