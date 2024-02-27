import { Router } from "express";
import {
  register,
  envioMail,
  cambiarRolUser,
  checkAdmin,
} from "../../controllers/ControllersApi/users.Controllers.js";
import { logger } from "../../utils/winston.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";
export const userRouter = new Router();
userRouter.post(
  "/",
  register,
  envioMail,
  async (req, res, next) => {
    logger.INFO(
      ` Login: ${
        req.user.email
      } - | ${new Date().toLocaleTimeString()} -  ${new Date().toLocaleDateString()}`
    );
    next();
  },
  async (req, res) => {
    res.created(req.user);
  }
);

userRouter.put(
  "/premium/:idUser",
  extraerUserCookie,
  checkAdmin,
  cambiarRolUser
);
