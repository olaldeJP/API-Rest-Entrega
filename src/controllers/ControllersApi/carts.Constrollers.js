import { productsMongoose, cartsMongoose } from "../../services/index.js";
import { cartsService } from "../../services/carts.service.js";
import { productService } from "../../services/products.service.js";
import { ticketService } from "../../services/ticket.service.js";

//Crea un nuevo carrito vacio
export async function createNewCart(req, res) {
  try {
    const cartN = await cartsService.crearNuevocart({});
    res.status(201).json(cartN);
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      mensaje: "Error en la solicitud de creacion de un nuevo carro",
    });
  }
}

// Agrega el producto (pID) al carrito, verifica si existe, si es asi lo agrega al carrito o lo suma, si no existe el id del carrito o producto lo informa
export async function agregarProductosArregloCartsByCId(req, res) {
  try {
    const cId = req.params.cid;
    const pId = req.params.pid;
    const cart = await cartsService.agregarProductoAlCart(cId, pId);
    res.status(200).json({ status: "success", cart: cart });
  } catch (error) {
    return res.status(500).json({ status: "ERROR", mensaje: error.message });
  }
}

// Devuelve el arreglo de productos del carrito enviado, en caos que no lo encuentre lo devuelve
export async function mostrarCartByCId(req, res) {
  try {
    const cart = await cartsService.buscarCartPorID(req.params.cid);
    if (cart) {
      return res.status(200).json(cart.products);
    }
    throw new Error();
  } catch (error) {
    return res
      .status(404)
      .json({ status: "ERROR", mensaje: "Error en mostrar la lista " });
  }
}

// Envia todos los carritos que esten guardados en la base de datos.
export async function mostrarListaDeCarts(req, res) {
  try {
    const listaCarrito = await cartsService.mostrarVarioscarts();
    res.status(200).json(listaCarrito);
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: "Error en la peticion" });
  }
}

//Se borra del arreglo del carrito el producto(pid) enviado
export async function borrarProductoDelCarrito(req, res) {
  try {
    const pid = req.params.pid;
    const cid = req.params.cId;

    const carritoEncontrar = await cartsService.borrarProductoAlCart(cid, pid);
    if (carritoEncontrar) {
      return res.status(200).json({ status: "success", carritoEncontrar });
    } else {
      return res
        .status(400)
        .json({ status: "ERROR", message: "error al borrar el producto" });
    }
  } catch (error) {
    return res.status(400).json({ status: "ERROR", message: message.error });
  }
}

//Se aumenta el numero de quantity del producto(pid) en el carrito (cid) enviado
export async function actualizarProductoEnElCarrito(req, res) {
  // pensado de la forma que el se envia desde el req.body un json { "quantity" : cantidad a agregar}
  try {
    const cantidad = req.body;
    const pid = req.params.pid;
    const cid = req.params.cId;

    const carritoActualizar = await cartsMongoose.findById(cid);
    if (carritoActualizar) {
      var element;
      for (let index = 0; index < carritoActualizar.products.length; index++) {
        element = carritoActualizar.products[index];
        if (element._id == pid) {
          element.quantity = element.quantity + cantidad.quantity;
          break;
        }
      }
      if (element._id == pid) {
        await carritoActualizar.save();

        return res.status(200).json(carritoActualizar);
      } else {
        return res
          .status(400)
          .json({ status: "ERROR", message: "ID producto invalido" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "ERROR", message: "ID carts invalido" });
    }
  } catch (error) {
    return res.status(400).json({ status: "ERROR", message: error.message });
  }
}

//Se envia un arreglo, y se reemplaza por el actual en el carrito
export async function actualizarCarrito(req, res) {
  try {
    const nuevoArreglo = req.body.docs;
    const cid = req.params.cId;

    const carrito = await cartsMongoose.findOneAndReplace(
      { _id: cid },
      { products: nuevoArreglo },
      { new: true }
    );

    if (carrito) {
      return res.status(200).json(carrito);
    } else {
      return res
        .status(400)
        .json({ status: "ERROR", message: "ID del carrito invalido" });
    }
  } catch (error) {
    return res.status(400).json({ status: "ERROR", message: error.message });
  }
}
//Se reemplaza el arreglo de productos en el carrito(cid) indicado por un arreglo vacio
export async function eliminarTodosLosProductosDelCarrito(req, res) {
  try {
    const cid = req.params.cId;

    const carrito = await cartsMongoose.findOneAndReplace(
      { _id: cid },
      { products: [] },
      { new: true }
    );

    if (carrito) {
      return res.status(200).json(carrito);
    } else {
      return res
        .status(400)
        .json({ status: "ERROR", message: "ID del carrito invalido" });
    }
  } catch (error) {
    return res.status(400).json({ status: "ERROR", message: error.message });
  }
}

export async function validUser(req, res, next) {
  try {
    if (req.user.role === "user") {
      next();
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "UNAUTHORIZED USER" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}

export async function validarStockYSumar(req, res, next) {
  let suma = 1;
  try {
    const cart = await cartsService.buscarCartPorID(req.params.cid);
    if (!cart) {
      throw { error: true, message: "ID NOT FOUND" };
    } else {
      const valid = await cartsService.validarStock(cart);
      if (!valid) {
        throw { error: true, message: "NO STOCK" };
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
  res.json({ status: "success", ticket: newTicket });
}
