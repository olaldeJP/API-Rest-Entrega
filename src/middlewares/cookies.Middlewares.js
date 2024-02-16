import { encriptar } from "../utils/criptorafia.js";
import { desencriptar } from "../utils/criptorafia.js";

export async function guardarUserToken(req, res, next) {
  req.token = "Bearer " + (await encriptar(req.user));
  next();
}

export async function extraerUserCookie(req, res, next) {
  try {
    const token = req.headers.authorization.slice(7);
    const token2 = req.body.token;
    const tokenDesencript = await desencriptar(token);
    req.user = tokenDesencript;
    next();
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}
