export async function cargarMocksProducts(req, res, next) {
  for (let index = 0; index < 999; index++) {
    await productsMock.addMocksProduct();
  }
  next();
}
