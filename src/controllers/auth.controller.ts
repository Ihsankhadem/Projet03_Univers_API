// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const { password } = req.body;

      if (!req.user) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const result = await AuthService.changePassword(req.user.id, password);

      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
