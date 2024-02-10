import { Router } from "express";
import {
  agregarProductosArregloCartsByCId,
  mostrarListaDeCarts,
  mostrarCartByCId,
  createNewCart,
  borrarProductoDelCarrito,
  actualizarCarrito,
  validUser,
  actualizarProductoEnElCarrito,
  eliminarTodosLosProductosDelCarrito,
  finalizarCompra,
  restarProducts,
  validarStockYSumar,
} from "../../controllers/ControllersApi/carts.Constrollers.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";

export const cartsRouter = new Router();

//Carga de los controllers al router de carts
cartsRouter.use(extraerUserCookie, validUser);
cartsRouter.post("/", createNewCart);
cartsRouter.post("/:cid/product/:pid", agregarProductosArregloCartsByCId);
cartsRouter.get("/:cid", mostrarCartByCId);
cartsRouter.get("/", mostrarListaDeCarts);
cartsRouter.put("/:cId", actualizarCarrito);
cartsRouter.put("/:cId/products/:pid", actualizarProductoEnElCarrito);
cartsRouter.delete("/:cId/products/:pid", borrarProductoDelCarrito);
cartsRouter.delete("/:cId", eliminarTodosLosProductosDelCarrito);
cartsRouter.post(
  "/:cid/purchase",
  validarStockYSumar,
  restarProducts,
  finalizarCompra
);
