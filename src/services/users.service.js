import { userDaoMongoose } from "../dao/models/db/usersMongoose.js";
import { hashear } from "./crypt.js";
class UsersService {
  async register(newUser) {
    const user = await userDaoMongoose.create(newUser);
    return user;
  }
  async buscarUser(query) {
    const user = await userDaoMongoose.readOne(query);
    return user;
  }
  async actualizarPasswordUser(query) {
    query.password = hashear(query.password);
    const user = await userDaoMongoose.updateOne({
      email: query.email,
      password: query.password,
    });
    return user;
  }
  async buscarMuchosUsers(query) {
    const user = await userDaoMongoose.readMany(query);
    return user;
  }
  async borrarUser(query) {
    const user = await userDaoMongoose.deleteOne(query);
    return user;
  }
  async borrarMuchosUsers(query) {
    const user = await userDaoMongoose.deleteMany(query);
    return user;
  }
}

export const usersService = new UsersService();
