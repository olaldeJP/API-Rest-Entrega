import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";
import { hasheadasSonIguales, hashear } from "../../../utils/crypt.js";
import { usersMongoose } from "../../../utils/index.js";
import {
  ErrorType,
  NewError,
} from "../../../middlewares/errorsManagers.Middlewares.js";
import { urlencoded } from "express";

const UsersManager = new Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    age: { type: Number },
    password: { type: String, required: true, default: "(NO ES NECESARIO)" },
    carts: { type: [], ref: "carts._id", default: [] },
    documents: { type: [Object], default: [{ name: "", reference: "" }] },
    last_connection: { type: Date },
    role: { type: String, enum: ["admin", "user", "premium"], default: "user" },
  },
  {
    strict: "throw",
    versionKey: false,
    static: {},
  }
);

export const usersModel = mongoose.model("users", UsersManager);

class UsersDaoMonoose {
  async create(data) {
    data.password = await hashear(data.password);
    const newUser = await usersMongoose.create(data);
    return await this.devolverSinPassword(newUser);
  }
  async existeUser(query) {
    const user = await usersMongoose.findOne({ email: query.email }).lean();
    if (user) {
      return await this.devolverSinPassword(user);
    }
    return null;
  }
  async readOne(query) {
    try {
      const user = await usersMongoose.findOne({ email: query.email }).lean();
      if (await hasheadasSonIguales(query.password, user.password)) {
        return await this.devolverSinPassword(user);
      }
    } catch (error) {
      return null;
    }
  }
  async readMany(query) {
    return await usersMongoose.find(query).lean();
  }

  async updateCarts(emailUser, _idCart) {
    const array = await usersMongoose
      .findOneAndUpdate(
        { email: emailUser },
        { $push: { carts: { _id: _idCart } } },
        { new: true }
      )
      .lean();
    return array;
  }
  async updateDate(emailUser) {
    const currentDate = new Date();
    const update = await usersMongoose
      .findOneAndUpdate(
        { email: emailUser },
        { $set: { last_connection: currentDate } },
        { new: true }
      )
      .lean();
    return update;
  }
  async updateOnePassword(query) {
    const updateUser = await usersMongoose
      .updateOne(
        { email: query.email },
        { $set: { password: query.password } },
        { new: true }
      )
      .lean();
    return updateUser;
  }
  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }
  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }
  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
  async findCart(_idCart, userEmail) {
    const array = await usersMongoose
      .findOne({ email: userEmail, carts: { _id: _idCart } })
      .lean();
    return array;
  }
  async changeRol(id) {
    const user = await usersMongoose.findOne({ _id: id });
    if (user) {
      if (user.role === "user") {
        await usersMongoose
          .findOneAndUpdate(
            { _id: id },
            { $set: { role: "premium" } },
            { new: true }
          )
          .lean();
      } else {
        if (user.role === "premium") {
          await usersMongoose
            .findOneAndUpdate(
              { _id: id },
              { $set: { role: "user" } },
              { new: true }
            )
            .lean();
        }
      }
      return await this.devolverSinPassword(user);
    }
    throw new NewError(ErrorType.UNAUTHORIZED_USER, "USER NOT FOUND");
  }

  async devolverSinPassword(query) {
    const datosUsuario = {
      _id: query["_id"],
      email: query["email"],
      first_name: query["first_name"],
      last_name: query["last_name"],
      age: query["age"],
      carts: query["carts"],
      role: query["role"],
      last_connection: query["last_connection"],
    };
    return datosUsuario;
  }
}

export const userDaoMongoose = new UsersDaoMonoose();
