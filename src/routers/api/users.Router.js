import { Router } from "express";
import {
  register,
  envioMail,
} from "../../controllers/ControllersApi/users.Controllers.js";

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
