import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import mongoosePaginate from "mongoose-paginate-v2";
import { productsMongoose } from "../../../services/index.js";
import {
  ErrorType,
  NewError,
} from "../../../middlewares/errorsManagers.Middlewares.js";

const productoSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    code: { type: Number, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String },
    title: { type: String, default: "Sin Titulo" },
  },
  { collection: "products" },
  {
    strict: "throw",
    versionKey: false,
    methods: {
      addProductMongoose: function (newProduct) {
        if (!this.productos.includes(pID)) {
          this.productos.push(pID);
        }
      },
    },
  }
);
productoSchema.plugin(mongoosePaginate);
export const productsManagerMongoose = model("products", productoSchema);

class ProductsDaoMonoose {
  async create(data) {
    try {
      const newProducto = await productsMongoose.create(data);
      return newProducto.toObject();
    } catch (error) {
      throw new NewError(ErrorType.INVALID_DATA, error.message);
    }
  }

  async readOne(query) {
    const product = await productsMongoose.findById(query).lean();
    return product;
  }
  async readMany(query) {
    const array = await productsMongoose.find().lean();
    return array;
  }
  async updateOne(query, data) {
    const productUpdate = await productsMongoose
      .findByIdAndUpdate(
        query,
        { $set: data },
        {
          new: true,
        }
      )
      .lean();
    return productUpdate;
  }
  async updateMany(query, data) {}
  async deleteOne(query) {
    const productDelete = await productsMongoose
      .findByIdAndDelete(query)
      .lean();
    return productDelete;
  }
  async deleteMany(query) {}
}

export const productsDaoMongoose = new ProductsDaoMonoose();
