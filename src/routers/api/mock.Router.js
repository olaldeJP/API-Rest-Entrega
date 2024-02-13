import { Router } from "express";
import {
  cargarMocksProducts,
  mostrarMocksProducts,
} from "../../controllers/ControllersApi/mocks.Controllers.js";
export const mockRouter = new Router();

mockRouter.get("/mockingproducts", cargarMocksProducts, mostrarMocksProducts);
