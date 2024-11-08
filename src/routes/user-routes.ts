import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

export const userRoutes=Router();



userRoutes.route("/").post(UserController.create).get(UserController.readAll);