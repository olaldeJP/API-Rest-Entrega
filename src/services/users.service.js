import { userDaoMongoose } from "../dao/models/db/usersMongoose.js";
import {
  ErrorType,
  NewError,
} from "../middlewares/errorsManagers.Middlewares.js";
import { hashear } from "./crypt.js";
class UsersService {
  async register(newUser) {
    const user = await userDaoMongoose.create(newUser);
    return user;
  }
  async buscarUser(query) {
    const user = await userDaoMongoose.existeUser(query);
    if (!user) {
      throw new NewError(ErrorType.UNAUTHORIZED_USER, "USER NOT FOUND");
    }
    return user;
  }
  async actualizarPasswordUser(email, password) {
    const passwordH = hashear(password);
    const user = await userDaoMongoose.updateOnePassword({
      email: email,
      password: passwordH,
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
      throw new NewError(ErrorType.FORBIDDEN_USER, "THIS CART IS NOT YOURS");
    }
    return user;
  }
  async cambiarRolUsuario(id) {
    const user = await userDaoMongoose.changeRol(id);
    return user;
  }
}

export const usersService = new UsersService();
