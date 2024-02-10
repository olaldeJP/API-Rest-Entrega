import mongoose from "mongoose";
import { URL_MONGO } from "../config/config.js";

export async function conectar() {
  await mongoose.connect(URL_MONGO);
}

export async function desconectar() {
  await mongoose.disconnect();
}

export { productsManagerMongoose as productsMongoose } from "../dao/models/db/ProductsMongoose.js";
export { cartsManagerMongoose as cartsMongoose } from "../dao/models/db/CartsMongoose.js";
export { MessagesManagerMongoose as messageMongoose } from "../dao/models/db/messagesMongoose.js";
export { usersModel as usersMongoose } from "../dao/models/db/usersMongoose.js";
