import { usersService } from "../../services/users.service.js";
import { emailService } from "../../services/email.service.js";

export async function sesionActual(req, res) {
  try {
    if (req.user) {
      return res.result(req.user);
    }
    throw new Error("UNAUTHORIZED USER");
  } catch (error) {
    return res.status(404).json({ status: "error", message: error.message });
  }
}

export async function register(req, res, next) {
  try {
    req.user = await usersService.register(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function envioMail(req, res, next) {
  emailService.send(
    req.user.email,
    "BIENVENIDO",
    ` Te Damos La Bienvenida ${req.user.first_name} AL ECOMERS`
  );
  next();
}
