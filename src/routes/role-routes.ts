import { Router } from "express";
import { RoleController } from "../controllers/role-controller.js";

export const roleRoutes=Router();



roleRoutes.route("/").post(RoleController.create).get(RoleController.readAll);