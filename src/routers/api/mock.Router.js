import { Router } from "express";
import { mostrarMocksProducts } from "../../controllers/ControllersApi/mocks.Controllers.js";
import { cargarMocksProducts } from "../../middlewares/mocks.Middlewares.js";
export const mockRouter = new Router();

mockRouter.get("/mockingproducts", cargarMocksProducts, mostrarMocksProducts);
