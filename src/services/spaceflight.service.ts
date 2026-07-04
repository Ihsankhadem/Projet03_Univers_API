// src/services/spaceflight.service.ts

import SpaceflightModel from "../models/spaceflight.model.js";
import { AppError } from "../errors/AppError.js";
import type { SpaceArticle } from "../models/spaceflight.model.js";

const SpaceflightService = {
  async getArticles(limit: number, offset: number) {
    return SpaceflightModel.getArticles(limit, offset);
  },

  async search(query: string, limit: number) {
    if (!query || query.trim().length === 0) {
      throw new AppError("Query invalide", 400);
    }
    return SpaceflightModel.search(query, limit);
  },

  async getById(id: number): Promise<SpaceArticle> {
    if (!id || id <= 0) {
      throw new AppError("ID invalide", 400);
    }

    const article = await SpaceflightModel.getById(id);

    if (!article) {
      throw new AppError("Article Spaceflight non trouvé", 404);
    }
    return article;
  },
};

export default SpaceflightService;
