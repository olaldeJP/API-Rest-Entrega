import { Router } from "express";
import {
  agregarProductosArregloCartsByCId,
  mostrarListaDeCarts,
  mostrarCartByCId,
  createNewCart,
  validarCarroUser,
  validarUsuarioNoSeaOwner,
  borrarProductoDelCarrito,
  actualizarCarrito,
  validUser,
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
cartsRouter.post(
  "/:cId/product/:pid",
  validarUsuarioNoSeaOwner,
  validarCarroUser,
  agregarProductosArregloCartsByCId
);
cartsRouter.get("/:cId", validarCarroUser, mostrarCartByCId);
cartsRouter.get("/", mostrarListaDeCarts);
cartsRouter.put("/:cId", validarCarroUser, actualizarCarrito);
cartsRouter.delete(
  "/:cId/products/:pid",
  validarCarroUser,
  borrarProductoDelCarrito
);
cartsRouter.delete(
  "/:cId",
  validarCarroUser,
  eliminarTodosLosProductosDelCarrito
);
cartsRouter.post(
  "/:cId/purchase",
  validarCarroUser,
  validarStockYSumar,
  restarProducts,
  finalizarCompra
);
