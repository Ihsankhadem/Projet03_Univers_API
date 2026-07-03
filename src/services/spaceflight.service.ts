import SpaceflightModel from "../models/spaceflight.model.js";
import { AppError } from "../errors/AppError.js";
import type { SpaceArticle } from "../models/spaceflight.model.js";

const SpaceflightService = {
  /**
   * LIST ARTICLES
   */
  async getArticles(limit: number, offset: number) {
    const safeLimit = Math.min(Math.max(limit || 25, 1), 50);
    const safeOffset = Math.max(offset || 0, 0);

    return SpaceflightModel.getArticles(safeLimit, safeOffset);
  },

  /**
   * SEARCH ARTICLES
   */
  async search(query: string, limit: number) {
    const cleanQuery = query?.trim();

    if (!cleanQuery) {
      throw new AppError("Query invalide", 400);
    }

    const safeLimit = Math.min(Math.max(limit || 25, 1), 50);

    return SpaceflightModel.search(cleanQuery, safeLimit);
  },

  /**
   * GET BY ID
   */
  async getById(id: number): Promise<SpaceArticle> {
    const safeId = Number(id);

    if (!safeId || safeId <= 0) {
      throw new AppError("ID invalide", 400);
    }

    const article = await SpaceflightModel.getById(safeId);

    //  sécurité supplémentaire (rare mais propre)
    if (!article?.id) {
      throw new AppError("Article Spaceflight non trouvé", 404);
    }

    return article;
  },
};

export default SpaceflightService;
