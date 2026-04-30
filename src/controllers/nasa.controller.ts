import { Request, Response } from "express";
import NasaModel from "../models/nasa.model";

const NasaController = {
  // GET /api/nasa/apod
  getToday: async (_req: Request, res: Response) => {
    try {
      const data = await NasaModel.getToday();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur NASA APOD", details: err });
    }
  },

  // GET /api/nasa/apod/last?count=10
  getLast: async (req: Request, res: Response) => {
    try {
      const count = Number(req.query.count) || 10;
      const data = await NasaModel.getLast(count);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur NASA APOD", details: err });
    }
  },

  // GET /api/nasa/apod/range?start=2026-01-01&end=2026-01-07
  getRange: async (req: Request, res: Response) => {
    try {
      const { start, end } = req.query as { start: string; end: string };
      if (!start || !end) {
        res.status(400).json({ error: "Paramètres start et end requis" });
        return;
      }
      const data = await NasaModel.getRange(start, end);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur NASA APOD", details: err });
    }
  },
};

export default NasaController;
