// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Zod validation
  if (err instanceof ZodError) {
    console.error("🔥 ERREUR BACKEND :", err); // 👈 IMPORTANT

    return res.status(400).json({
      error: "Validation échouée",
      details: err.flatten(),
    });
  }

  // erreurs métier
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // debug serveur
  console.error("🔥 UNHANDLED ERROR:", err);

  return res.status(500).json({
    error: "Erreur serveur",
  });
};
