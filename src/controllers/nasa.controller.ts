// src/controllers/nasa.controller.ts

import { Request, Response } from "express";
import { ZodError } from "zod";

import NasaModel from "../models/nasa.model.js";
import { getLastSchema, getRangeSchema } from "../validators/nasa.validator.js";

const NasaController = {
  getToday: async (_req: Request, res: Response) => {
    try {
      const data = await NasaModel.getToday();

      res.json(data);
    } catch {
      res.status(502).json({
        error: "NASA API unavailable",
      });
    }
  },

  getLast: async (req: Request, res: Response) => {
    try {
      const { count } = getLastSchema.parse(req.query);

      const data = await NasaModel.getLast(count);

      res.json(data);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: err.issues,
        });
      }

      return res.status(502).json({
        error: "NASA API unavailable",
      });
    }
  },

  getRange: async (req: Request, res: Response) => {
    try {
      const { start, end } = getRangeSchema.parse(req.query);

      const data = await NasaModel.getRange(start, end);

      res.json(data);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: err.issues,
        });
      }

      return res.status(502).json({
        error: "NASA API unavailable",
      });
    }
  },
};

export default NasaController;
