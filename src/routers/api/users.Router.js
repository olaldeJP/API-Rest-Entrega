import { Router } from "express";
import {
  register,
  envioMail,
} from "../../controllers/ControllersApi/users.Controllers.js";

export const userRouter = new Router();
userRouter.post("/", register, envioMail, (req, res) => {
  res.status(201).json({ status: "success", user: req.user });
});
