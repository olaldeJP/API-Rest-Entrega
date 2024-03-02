import { Router } from "express";
import { upload } from "../../middlewares/multer.Middlewares.js";
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
import { validAdminAndPremium } from "../../middlewares/authorizathion.middleware.js";

export const productsRouter = new Router();
productsRouter.use(extraerUserCookie);
productsRouter.get("/", getProductsController);
productsRouter.get("/productsPaginate", getProductsPaginate);
productsRouter.get("/:pid", getProductsByIdController);
productsRouter.post("/addImg", upload.single("imagenProductos"));
productsRouter.post("/", validAdminAndPremium, addNewProduct);
productsRouter.put("/:pid", validAdminAndPremium, updateProduct);
productsRouter.delete(
  "/:pId",
  validAdminAndPremium,
  validarProducto,
  deleteProductMongoose
);
