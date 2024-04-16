import { Router } from "express";
import passport from "passport";

import { sesionActual } from "../../controllers/ControllersApi/users.Controllers.js";
import {
  logout,
  validarUser,
  cambiarPass,
  linkCambiarPassword,
  updateLoginDate,
} from "../../controllers/ControllersApi/sessions.Constrollers.js";
import {
  extraerUserCookie,
  guardarUserToken,
} from "../../middlewares/cookies.Middlewares.js";
import { logger } from "../../utils/winston.js";

export const sessionsRouter = new Router();

sessionsRouter.use((req, res, next) => {
  next();
});

sessionsRouter.post(
  "/login",
  passport.authenticate("loginLocal", {
    failWithError: true,
  }),
  guardarUserToken,
  updateLoginDate,
  async (req, res) => {
    logger.INFO(
      ` Login: ${
        req.user.email
      } - | ${new Date().toLocaleTimeString()} -  ${new Date().toLocaleDateString()}`
    );
    res.result(req.token);
  }
);
sessionsRouter.get("/current", extraerUserCookie, sesionActual);
sessionsRouter.delete("/logout", updateLoginDate, logout);
sessionsRouter.put("/linkCambiarPassword", validarUser, linkCambiarPassword);
sessionsRouter.get("/cambiarPassword/:user", cambiarPass);
