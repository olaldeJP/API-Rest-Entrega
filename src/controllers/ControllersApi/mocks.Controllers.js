import { productsMock } from "../../dao/models/mock/products.Mock.js";

export async function mostrarMocksProducts(req, res, next) {
  res.json(await productsMock.getMocksProducts());
}
