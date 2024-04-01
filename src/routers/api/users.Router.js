import { Router } from "express";
import {
  register,
  envioMail,
  cambiarRolUser,
  checkAdmin,
  checkDocuments,
} from "../../controllers/ControllersApi/users.Controllers.js";
import { logger } from "../../utils/winston.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";
import {
  updateLoginDate,
  validarUserbyId,
} from "../../controllers/ControllersApi/sessions.Constrollers.js";
import {
  updateFilesUser,
  uploadFiles,
} from "../../middlewares/multer.Middlewares.js";
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
  updateLoginDate,
  async (req, res) => {
    res.created(req.user);
  }
);

userRouter.put(
  "/premium/:idUser",
  extraerUserCookie,
  checkAdmin,
  checkDocuments,
  cambiarRolUser
);

userRouter.put(
  "/premiumAdmin/:idUser",
  extraerUserCookie,
  checkAdmin,
  cambiarRolUser
);

userRouter.post(
  "/:uid/documents",
  (req, res, next) => {
    req.body = req.params.uid;
    next();
  },
  validarUserbyId,
  uploadFiles,
  updateFilesUser,
  (req, res, next) => {
    res
      .status(200)
      .json({ status: "Success", message: "Files Update Success" });
  }
);
