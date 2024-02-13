import { productsMock } from "../../dao/models/mock/products.Mock.js";

export async function cargarMocksProducts(req, res, next) {
  for (let index = 0; index < 999; index++) {
    await productsMock.addMocksProduct();
  }
  next();
}

export async function mostrarMocksProducts(req, res, next) {
  res.json(await productsMock.getMocksProducts());
}
