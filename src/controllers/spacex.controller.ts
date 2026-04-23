import { Request, Response } from "express";
import SpaceXModel from "../models/spacex.model";

const SpaceXController = {
  // GET /api/spacex/upcoming
  getUpcoming: async (_req: Request, res: Response) => {
    try {
      const data = await SpaceXModel.getUpcoming();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur SpaceX API", details: err });
    }
  },

  // GET /api/spacex/latest?limit=10
  getLatest: async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const data = await SpaceXModel.getLatest(limit);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur SpaceX API", details: err });
    }
  },

  // GET /api/spacex/:id
  getById: async (req: Request, res: Response) => {
    try {
      const data = await SpaceXModel.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Erreur SpaceX API", details: err });
    }
  },
};

export default SpaceXController;