// validateQuery.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validateQuery =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
