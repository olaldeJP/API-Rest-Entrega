import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const MessageSchema = new Schema(
  {
    user: { type: String },
    message: { type: String },
  },
  { collection: "messages" },
  {
    strict: "throw",
    versionKey: false,
    methods: {},
  }
);

export const MessagesManagerMongoose = model("messages", MessageSchema);

class messaesDaoMonoose {
  async create(data) {}
  async readOne(query) {}
  async readMany(query) {}
  async updateOne(query, data) {}
  async updateMany(queri, data) {}
  async deleteOne(query) {}
  async deleteMany(query) {}
}
