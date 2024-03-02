import { productsMongoose, cartsMongoose } from "../../services/index.js";
import { cartsService } from "../../services/carts.service.js";
import { ticketService } from "../../services/ticket.service.js";
import { usersService } from "../../services/users.service.js";
import { logger } from "../../utils/winston.js";
import {
  ErrorType,
  NewError,
} from "../../middlewares/errorsManagers.Middlewares.js";

//Crea un nuevo carrito vacio
export async function createNewCart(req, res, next) {
  try {
    const cartN = await cartsService.crearNuevocart({});
    await usersService.agregarCarrito(req.user.email, cartN._id);

    res.created(cartN);
  } catch (error) {
    next(error);
  }
}

// Agrega el producto (pID) al carrito, verifica si existe, si es asi lo agrega al carrito o lo suma, si no existe el id del carrito o producto lo informa
export async function agregarProductosArregloCartsByCId(req, res, next) {
  try {
    const cId = req.params.cId;
    const pId = req.params.pid;
    const cart = await cartsService.agregarProductoAlCart(cId, pId);
    res.created(cart);
  } catch (error) {
    next(error);
  }
}

// Devuelve el arreglo de productos del carrito enviado, en caos que no lo encuentre lo devuelve
export async function mostrarCartByCId(req, res, next) {
  try {
    const cart = await cartsService.buscarCartPorID(req.params.cId);
    res.result(cart.products);
  } catch (error) {
    next(error);
  }
}

// Envia todos los carritos que esten guardados en la base de datos.
export async function mostrarListaDeCarts(req, res, next) {
  try {
    const listaCarrito = await cartsService.mostrarVarioscarts();
    res.result(listaCarrito);
  } catch (error) {
    next(error);
  }
}

//Se borra del arreglo del carrito el producto(pid) enviado
export async function borrarProductoDelCarrito(req, res, next) {
  try {
    const pid = req.params.pid;
    const cid = req.params.cId;

    const carritoEncontrar = await cartsService.borrarProductoAlCart(cid, pid);
    if (carritoEncontrar) {
      return res.result(carritoEncontrar);
    }
    throw new NewError(ErrorType.NOT_FOUND, "ID ERROR");
  } catch (error) {
    next(error);
  }
}

//Se envia un arreglo, y se reemplaza por el actual en el carrito
export async function actualizarCarrito(req, res, next) {
  try {
    const nuevoArreglo = req.body.docs;
    const cid = req.params.cId;

    const carrito = await cartsMongoose.findOneAndReplace(
      { _id: cid },
      { products: nuevoArreglo },
      { new: true }
    );

    if (carrito) {
      return res.result(carrito);
    } else {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
    }
  } catch (error) {
    next(error);
  }
}
//Se reemplaza el arreglo de productos en el carrito(cid) indicado por un arreglo vacio
export async function eliminarTodosLosProductosDelCarrito(req, res, next) {
  try {
    const cid = req.params.cId;

    const carrito = await cartsMongoose.findOneAndReplace(
      { _id: cid },
      { products: [] },
      { new: true }
    );

    if (carrito) {
      return res.result(carrito);
    } else {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
    }
  } catch (error) {
    next(error);
  }
}

export async function validUser(req, res, next) {
  try {
    if (req.user.role === "user" || req.user.role === "premium") {
      next();
    } else {
      throw new NewError(ErrorType.UNAUTHORIZED_USER, "UNAUTHORIZED USER");
    }
  } catch (error) {
    next(error);
  }
}

export async function validarStockYSumar(req, res, next) {
  let suma = 1;
  try {
    const cart = await cartsService.buscarCartPorID(req.params.cId);
    if (!cart) {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
    } else {
      const valid = await cartsService.validarStock(cart);
      if (!valid) {
        throw new NewError(ErrorType.ERROR_REQUEST, "NOT ENOUGHT STOCK");
      }
      req["cart"] = cart;
      next();
    }
  } catch (error) {
    next(error);
  }
}

export async function restarProducts(req, res, next) {
  const total = await cartsService.sumarYSacarProductos(req["cart"]);
  req["total"] = total;
  next();
}

export async function finalizarCompra(req, res, next) {
  const newTicket = await ticketService.crearTicket(
    req["total"],
    req.user.email
  );
  res.result(newTicket);
}

export async function validarCarroUser(req, res, next) {
  try {
    const _idCart = req.params.cId;
    const cart = await usersService.buscarCartPorIdEnArreglo(
      _idCart,
      req.user.email
    );
    next();
  } catch (error) {
    next(error);
  }
}
