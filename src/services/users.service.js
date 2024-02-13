import { userDaoMongoose } from "../dao/models/db/usersMongoose.js";
import {
  ErrorType,
  newError,
} from "../middlewares/errorsManagers.Middlewares.js";
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
    const user = await userDaoMongoose.updateOnePassword({
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
  async agregarCarrito(emailUser, _idCart) {
    const user = await userDaoMongoose.updateCarts(emailUser, _idCart);
  }
  async buscarCartPorIdEnArreglo(_idCart, userEmail) {
    const user = await userDaoMongoose.findCart(_idCart, userEmail);
    if (!user) {
      throw await newError(ErrorType.FORBIDDEN_USER, "THIS CART IS NOT YOURS");
    }
    return user;
  }
}

export const usersService = new UsersService();
