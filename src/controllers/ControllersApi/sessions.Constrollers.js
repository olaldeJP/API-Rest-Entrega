import { usersService } from "../../services/users.service.js";
import { COOKIE_OPTS } from "../../config/config.js";
import { emailService } from "../../services/email.service.js";
import { desencriptar, encriptarUnaHora } from "../../utils/criptorafia.js";

//Se guarda en la base de datos el usuario enviado desde register.handlebars

export async function cambiarPass(req, res) {
  try {
    const user = await desencriptar(req.params.user);
    const actualizado = await usersService.actualizarPasswordUser(
      user.email,
      req.body.password
    );
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
    res.result("logout OK");
  });
}
export async function validarUser(req, res, next) {
  req["user"] = await usersService.buscarUser(req.body);
  next();
}
export async function linkCambiarPassword(req, res, next) {
  emailService.sendCambioContraseña(
    req.user.email,
    await encriptarUnaHora(req.user)
  );
  res.accepted();
}
export async function updateLoginDate(req, res, next) {
  await usersService.actualizarHorarioLogin(req.user.email);
  next();
}
