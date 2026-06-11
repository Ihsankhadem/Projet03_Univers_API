import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service.js";

const CategoryController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = req.query.search as string | undefined;
      const categories = await CategoryService.getAll(search);
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  getStats: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await CategoryService.getStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.getOne(Number(req.params.id));
      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  getArticlesByCategory: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const articles = await CategoryService.getArticlesByCategory(
        Number(req.params.id),
      );
      res.json(articles);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.create(req.body.name);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.update(
        Number(req.params.id),
        req.body.name,
      );

      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CategoryService.delete(Number(req.params.id));
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default CategoryController;
