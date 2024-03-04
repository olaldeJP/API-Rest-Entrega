import { cartsDaoMongoose } from "../dao/models/db/CartsMongoose.js";
import {
  NewError,
  ErrorType,
} from "../middlewares/errorsManagers.Middlewares.js";
import { productService } from "./products.service.js";
class CartsService {
  async buscarCartPorID(_id) {
    const carts = await cartsDaoMongoose.readOne(_id);
    if (!carts) {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
    }
    return carts;
  }
  async mostrarVarioscarts() {
    try {
      const array = await cartsDaoMongoose.readMany();
      return array;
    } catch {
      error;
    }
    {
      throw new NewError(ErrorType.ERROR_REQUEST, error.message);
    }
  }
  async crearNuevocart(newcarts) {
    const cartCreado = await cartsDaoMongoose.create(newcarts);
    if (!cartCreado) {
      throw new NewError(ErrorType.ERROR_REQUEST, "CREATE CART ERROR");
    }
    return cartCreado;
  }
  async actualizarcarts(id, carts) {
    const cartsoUpdate = await cartsDaoMongoose.updateOne(id, carts);
    if (!cartsoUpdate) {
      throw new NewError(ErrorType.ERROR_REQUEST, "UPDATE CART ERROR");
    }
    return cartsoUpdate;
  }
  async borrarcartsPorID(_id) {
    const cartsBorrado = await cartsDaoMongoose.deleteMany(_id);
    if (!cartsBorrado) {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART ERROR");
    }
    return cartsBorrado;
  }
  async agregarProductoAlCart(_idC, product) {
    const productoSumado = await cartsDaoMongoose.addProductCart(
      _idC,
      product._id
    );
    return productoSumado;
  }

  async borrarProductoAlCart(_idC, _idP) {
    const cart = await cartsDaoMongoose.deleteOne(_idC, _idP);
    return cart;
  }
  async validarStock(cart) {
    for (let index = 0; index < cart.products.length; index++) {
      let element = cart.products[index];
      let product = await productService.buscarPorID(element._id);
      if (!(product.stock > element.quantity)) {
        return false;
      }
    }
    return true;
  }
  async sumarYSacarProductos(cart) {
    let total = 0;
    for (let index = 0; index < cart.products.length; index++) {
      let element = cart.products[index];
      let product = await productService.buscarPorID(element._id);
      total = total + element.quantity * product.price;
      product.stock = product.stock - element.quantity;
      await productService.actualizarProducto(product._id, {
        stock: product.stock,
      });
    }
    return total;
  }
}

export const cartsService = new CartsService();
