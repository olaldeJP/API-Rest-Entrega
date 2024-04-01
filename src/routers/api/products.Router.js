import { Router } from "express";

import {
  getProductsController,
  getProductsByIdController,
  addNewProduct,
  updateProduct,
  deleteProductMongoose,
  getProductsPaginate,
  validarProducto,
} from "../../controllers/ControllersApi/products.Controllers.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";
import { validAdminAndPremium } from "../../middlewares/authorizathion.Middleware.js";
//import { uploadProducts } from "../../middlewares/multer.Middlewares.js";

export const productsRouter = new Router();
productsRouter.use(extraerUserCookie);
productsRouter.get("/", getProductsController);
productsRouter.get("/productsPaginate", getProductsPaginate);
productsRouter.get("/:pid", getProductsByIdController);
//productsRouter.post("/addImg", uploadProducts.single("imagenProductos"));
productsRouter.post("/", validAdminAndPremium, addNewProduct);
productsRouter.put("/:pid", validAdminAndPremium, updateProduct);
productsRouter.delete(
  "/:pId",
  validAdminAndPremium,
  validarProducto,
  deleteProductMongoose
);
