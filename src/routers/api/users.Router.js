import { Router } from "express";
import { register } from "../../controllers/ControllersApi/users.Controllers.js";

export const userRouter = new Router();
userRouter.post("/", register, (req, res) => {
  res.status(201).json({ status: "success", user: req.user });
});
