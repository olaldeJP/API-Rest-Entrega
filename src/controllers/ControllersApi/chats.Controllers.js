import { messageMongoose } from "../../utils/index.js";

export async function saveAndSend(req, res) {
  try {
    if (req.user.role === "admin") {
      throw new Error("Admin Not Autorizathe to Chat");
    }
    const mensaje = await messageMongoose.create(req.body);
    res["sendMessage"]();
    res.accepted();
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
