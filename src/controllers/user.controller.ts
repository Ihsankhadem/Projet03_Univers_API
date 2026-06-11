import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service.js";

const UserController = {
  findAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  getStats: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await UserService.getStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.createUser(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.updateUser(
        Number(req.params.id),
        req.body,
      );

      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.deleteUser(Number(req.params.id));
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default UserController;
