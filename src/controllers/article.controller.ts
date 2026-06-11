// src/controllers/article.controller.ts

import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/article.service.js";
import { AuthRequest } from "../middlewares/role.middleware.js";

const ArticleController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await ArticleService.getAll();
      res.json(articles);
    } catch (error) {
      next(error);
    }
  },

  getAllAdmin: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await ArticleService.getAllAdmin();
      res.json(articles);
    } catch (error) {
      next(error);
    }
  },

  getByAuthor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await ArticleService.getByAuthor(
        Number(req.params.author_id),
      );

      res.json(articles);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await ArticleService.getOne(Number(req.params.id));

      res.json(article);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await ArticleService.create({
        ...req.body,
        author_id: req.user!.id,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ArticleService.update(
        Number(req.params.id),
        req.body,
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ArticleService.delete(Number(req.params.id));

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default ArticleController;
