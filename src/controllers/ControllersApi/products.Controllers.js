import {
  ErrorType,
  NewError,
} from "../../middlewares/errorsManagers.Middlewares.js";
import { productsMongoose } from "../../services/index.js";
// import { changeNameAndId } from "../../middlewares/multer.Middlewares.js";
import { productService } from "../../services/products.service.js";
export async function getProductsController(req, res, next) {
  try {
    const array = await productService.mostrarVariosProductos();
    res.result(array);
  } catch (error) {
    next(error);
  }
}
export async function getProductsPaginate(req, res, next) {
  try {
    const productPaginate = await productService.mostrarProductosPaginados(req);
    res.result(productPaginate);
  } catch (error) {
    next(error);
  }
}
// Devuelve el producto con el ID especifico, en caso de no existir deuelve False
export async function getProductsByIdController(req, res, next) {
  try {
    const product = await productService.buscarPorID(req.params.pid);
    return res.result(product);
  } catch (error) {
    next(error);
  }
}
//Se envia la funcion agregada en res["sendProducts"]() del socket para actualizar los productos
export async function postAgregarProductController(req, res, next) {
  try {
    res["sendProducts"]();
    return res.result(res["productBody"]);
  } catch (error) {
    next(error);
  }
}
export async function checkAdmin(req, res, next) {
  try {
    if (!(req.user.role === "admin")) {
      throw new NewError(ErrorType.UNAUTHORIZED_USER, "YOU ARE NOT ADMIN");
    }
    next();
  } catch (error) {
    next(error);
  }
}
export async function addNewProduct(req, res, next) {
  try {
    const nuevoProduct = await productService.crearProducto(req.body);
    return res.created(nuevoProduct);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const _id = req.params.pid;
    const productUpdate = await productService.actualizarProducto(
      _id,
      req.body
    );
    return res.result(productUpdate);
  } catch (error) {
    next(error);
  }
}

export async function deleteProductMongoose(req, res, next) {
  try {
    const productoEliminado = await productService.borrarProductoPorID(
      req.params.pId
    );
    return res.result(productoEliminado);
  } catch (error) {
    next(error);
  }
}

export async function agregarImg(req, res, next) {}

export async function validAdmin(req, res, next) {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      throw new NewError(ErrorType.UNAUTHORIZED_USER, "UNAUTHORIZED USER ");
    }
  } catch (error) {
    next(error);
  }
}
