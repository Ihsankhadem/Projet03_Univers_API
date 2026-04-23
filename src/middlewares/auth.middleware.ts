
// // src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET manquant");

export type Role = "rédacteur" | "administrateur";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: Role;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: number;
      role: Role;
    };

    // vérif exp côté backend aussi (optionnel mais propre)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token expiré" });
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ message: "Token invalide" });
  }
};

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







// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET manquant");
// }

// export interface AuthRequest extends Request {
//   user?: JwtPayload & {
//     id: number;
//     role: "rédacteur" | "administrateur";
//   };
// }

// export const authMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const header = req.headers.authorization;

//   if (!header || !header.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token manquant" });
//   }

//   const token = header.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded as AuthRequest["user"];
//     next();
//   } catch {
//     return res.status(401).json({ message: "Token invalide" });
//   }
// };