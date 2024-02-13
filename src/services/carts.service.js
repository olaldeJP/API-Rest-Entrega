import { cartsDaoMongoose } from "../dao/models/db/CartsMongoose.js";
import {
  newError,
  ErrorType,
} from "../middlewares/errorsManagers.Middlewares.js";
import { productService } from "./products.service.js";
class CartsService {
  async buscarCartPorID(_id) {
    const carts = await cartsDaoMongoose.readOne(_id);
    if (!carts) {
      throw await newError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
    }
    return carts;
  }
  async mostrarVarioscarts() {
    const array = await cartsDaoMongoose.readMany();
    return array;
  }
  async crearNuevocart(newcarts) {
    const cartCreado = await cartsDaoMongoose.create(newcarts);
    if (!cartCreado) {
      throw await newError(ErrorType.ERROR_REQUEST, "CREATE CART ERROR");
    }
    return cartCreado;
  }
  async actualizarcarts(id, carts) {
    const cartsoUpdate = await cartsDaoMongoose.updateOne(id, carts);
    if (!cartsoUpdate) {
      throw await newError(ErrorType.ERROR_REQUEST, "UPDATE CART ERROR");
    }
    return cartsoUpdate;
  }
  async borrarcartsPorID(_id) {
    const cartsoBorrado = await cartsDaoMongoose.deleteMany(_id);
    if (!cartsoBorrado) {
      throw await newError(ErrorType.NOT_FOUND, "ID CART ERROR");
    }
    return cartsoBorrado;
  }
  async agregarProductoAlCart(_idC, _idP) {
    const buscarProduct = await productService.buscarPorID(_idP);
    if (buscarProduct) {
      const productoSumado = await cartsDaoMongoose.addProductCart(
        _idC,
        buscarProduct._id
      );
      if (!buscarProduct) {
        throw await newError(ErrorType.NOT_FOUND, "CARTS NOT FOUND");
      }
      return productoSumado;
    }
    throw await newError(ErrorType.NOT_FOUND, "ID PRODUCT NOT FOUND");
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
