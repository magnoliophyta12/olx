import { Role } from "../models/role-model.js";
import { User } from "../models/user-model.js";
import { Request, Response } from "express";

export class RoleController {
  static async create(
    req: Request<{}, {}, { name: string; }>,
    res: Response
  ): Promise<any> {
    const role = await Role.create({ ...req.body });
    if (role) {
      return res
        .status(201)
        .json({ message: "Role added successfully", data: role.dataValues });
    }
    return res.status(500).json({ message: "Db Error", data: null });
  }
  static async readAll(req: Request, res: Response): Promise<any> {
    const roles = await Role.findAll({include:User});
    if (roles) {
      return res.status(201).json({ message: "List of roles", data: roles });
    }
    return res.status(500).json({ message: "Db Error", data: null });
  }
}