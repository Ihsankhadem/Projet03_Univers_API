import { Request, Response } from "express";
import SpaceflightService from "../services/spaceflight.service.js";
import {
  getArticlesSchema,
  searchArticlesSchema,
  getByIdSchema,
} from "../validators/spaceflight.validator.js";

const SpaceflightController = {
  getArticles: async (req: Request, res: Response) => {
    const { limit, offset } = getArticlesSchema.parse(req.query);

    const data = await SpaceflightService.getArticles(limit, offset);
    res.json(data);
  },

  search: async (req: Request, res: Response) => {
    const { q, limit } = searchArticlesSchema.parse(req.query);

    const data = await SpaceflightService.search(q, limit);
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const { id } = getByIdSchema.parse(req.params);

    const data = await SpaceflightService.getById(id);
    res.json(data);
  },
};

export default SpaceflightController;
