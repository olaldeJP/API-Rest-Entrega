import { usersService } from "../../services/users.service.js";
import { COOKIE_OPTS } from "../../config/config.js";
//Se guarda en la base de datos el usuario enviado desde register.handlebars

export async function cambiarPass(req, res) {
  try {
    const actualizado = await usersService.actualizarPasswordUser(req.body);
    res.json({ status: "success", payload: actualizado });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: "logout error", body: err });
    }
    res.clearCookie("authorization", COOKIE_OPTS);
    res.status(200).json({ status: "success", message: "logout OK" });
  });
}
