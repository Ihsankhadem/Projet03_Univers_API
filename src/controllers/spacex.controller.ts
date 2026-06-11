import { Request, Response } from "express";
import SpaceXService from "../services/spacex.service.js";

const SpaceXController = {
  getUpcoming: async (_req: Request, res: Response) => {
    const data = await SpaceXService.getUpcoming();
    res.json(data);
  },

  getLatest: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const data = await SpaceXService.getLatest(limit);
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const data = await SpaceXService.getById(id);
    res.json(data);
  },
};

export default SpaceXController;
