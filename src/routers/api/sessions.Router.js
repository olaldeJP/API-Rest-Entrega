import { Router } from "express";
import passport from "passport";

import { sesionActual } from "../../controllers/ControllersApi/users.Controllers.js";
import {
  logout,
  cambiarPass,
} from "../../controllers/ControllersApi/sessions.Constrollers.js";
import {
  extraerUserCookie,
  guardarUserToken,
} from "../../middlewares/cookies.Middlewares.js";
export const sessionsRouter = new Router();

sessionsRouter.use((req, res, next) => {
  next();
});

sessionsRouter.post(
  "/loginPassport",
  passport.authenticate("loginLocal", {
    failWithError: true,
  }),
  guardarUserToken,
  async (req, res) => {
    res.result(req.token);
  },

  (error, req, res, next) => {
    res.status(401).json({ status: "error", message: error.message });
  }
);
sessionsRouter.get("/current", extraerUserCookie, sesionActual);
sessionsRouter.delete("/logout", logout);
sessionsRouter.put("/cambiarPassword", cambiarPass);
