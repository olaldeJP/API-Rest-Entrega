import { cartsDaoMongoose } from "../dao/models/db/CartsMongoose.js";
import { productService } from "./products.service.js";
class CartsService {
  async buscarCartPorID(_id) {
    const carts = await cartsDaoMongoose.readOne(_id);
    return carts;
  }
  async mostrarVarioscarts() {
    const array = await cartsDaoMongoose.readMany();
    return array;
  }
  async crearNuevocart(newcarts) {
    const cartsoCreado = await cartsDaoMongoose.create(newcarts);
    return cartsoCreado;
  }
  async actualizarcarts(id, carts) {
    const cartsoUpdate = await cartsDaoMongoose.updateOne(id, carts);
    return cartsoUpdate;
  }
  async borrarcartsPorID(_id) {
    const cartsoBorrado = await cartsDaoMongoose.deleteMany(_id);
    return cartsoBorrado;
  }
  async agregarProductoAlCart(_idC, _idP) {
    const buscarProduct = await productService.buscarPorID(_idP);
    if (buscarProduct) {
      const productoSumado = await cartsDaoMongoose.addProductCart(
        _idC,
        buscarProduct._id
      );
      return productoSumado;
    }
    throw new Error("Product Not Found");
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
