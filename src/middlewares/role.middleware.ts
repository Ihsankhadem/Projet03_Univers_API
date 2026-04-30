// src/middlewares/role.middleware.ts
import { Request, Response, NextFunction } from "express";

export type Role = "rédacteur" | "administrateur";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: Role;
  };
}

export const requireRole = (roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    next();
  };
};
