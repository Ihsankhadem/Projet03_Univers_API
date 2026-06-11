// src/services/article.service.ts

import ArticleModel from "../models/article.model.js";
import { AppError } from "../errors/AppError.js";
import type { Article } from "../models/article.model.js";

const ArticleService = {
  getAll() {
    return ArticleModel.findAll();
  },

  getAllAdmin() {
    return ArticleModel.findAllAdmin();
  },

  getByAuthor(authorId: number) {
    return ArticleModel.findByAuthor(authorId);
  },

  async getOne(id: number) {
    const article = await ArticleModel.findById(id);

    if (!article) {
      throw new AppError("Article non trouvé", 404);
    }

    await ArticleModel.incrementViews(id);
    return article;
  },

  async create(data: Article) {
    const id = await ArticleModel.create(data);

    return {
      id,
      message: "Article créé avec succès",
    };
  },

  async update(id: number, data: Partial<Article>) {
    const affected = await ArticleModel.update(id, data);

    if (!affected) {
      throw new AppError("Article non trouvé", 404);
    }
    return {
      message: "Article mis à jour",
    };
  },

  async delete(id: number) {
    const affected = await ArticleModel.delete(id);

    if (!affected) {
      // si aucun article n'a été supprimé, c'est que l'article n'existait pas
      throw new AppError("Article non trouvé", 404);
    }
    return {
      message: "Article supprimé",
    };
  },
};

export default ArticleService;
