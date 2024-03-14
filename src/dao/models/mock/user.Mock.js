import { faker } from "@faker-js/faker";
export class UserMock {
  constructor() {}
  async createUserMock() {
    return {
      _id: faker.string.uuid(),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    };
  }
  async createMockUserDataWithout(field) {
    const userData = {
      _id: faker.string.uuid(),
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    };
    delete userData[field];
    return userData;
  }
}
