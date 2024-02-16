import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";

const TicketManager = new Schema(
  {
    _id: { type: String, default: randomUUID },
    code: { type: String, default: randomUUID },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number },
    purchaser: { type: String, required: true },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

export const ticketModel = mongoose.model("tickets", TicketManager);

class TicketDaoMongoose {
  async create(data) {
    const newTicket = await ticketModel.create(data);
    return new NewTicket.toObject();
  }
  async readOne(query) {}
  async readMany(query, data) {}
  async updateOne(query) {}
  async updateMany(query, data) {}
  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }
  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

export const ticketDaoMongoose = new TicketDaoMongoose();
