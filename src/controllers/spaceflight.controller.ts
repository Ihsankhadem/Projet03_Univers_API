import { Request, Response } from "express";
import SpaceflightModel from "../models/spaceflight.model";

const SpaceflightController = {
  // GET /api/spaceflight/articles?limit=12&offset=0
  getArticles: async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 12;
      const offset = Number(req.query.offset) || 0;
      const data = await SpaceflightModel.getArticles(limit, offset);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur Spaceflight API", details: err });
    }
  },

  // GET /api/spaceflight/articles/search?q=mars
  search: async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ error: "Paramètre q requis" });
        return;
      }
      const limit = Number(req.query.limit) || 12;
      const data = await SpaceflightModel.search(query, limit);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur Spaceflight API", details: err });
    }
  },

  // GET /api/spaceflight/articles/:id
  getById: async (req: Request, res: Response) => {
    try {
      const data = await SpaceflightModel.getById(Number(req.params.id));
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur Spaceflight API", details: err });
    }
  },
};

export default SpaceflightController;
