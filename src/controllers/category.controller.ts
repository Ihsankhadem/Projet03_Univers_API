//controllers/category.controller
import { Request, Response } from "express";
import CategoryModel from "../models/category.model";

const CategoryController = {
  // GET /api/categories
  getAll: async (_req: Request, res: Response) => {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // GET /api/categories/:id
  getOne: async (req: Request, res: Response) => {
    try {
      const category = await CategoryModel.findById(Number(req.params.id));
      if (!category) {
        res.status(404).json({ error: "Catégorie non trouvée" });
        return;
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  getArticlesByCategory: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const articles = await CategoryModel.getArticlesByCategory(id);

      res.json(articles);
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
    }
  },

  // POST /api/categories
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: "Le champ 'name' est obligatoire" });
        return;
      }
      const id = await CategoryModel.create(name);
      res.status(201).json({ id, message: "Catégorie créée avec succès" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // PUT /api/categories/:id
  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;

      if (!name) {
        res.status(400).json({
          error: "Le champ 'name' est obligatoire",
        });
        return;
      }

      const affected = await CategoryModel.update(id, name);

      if (!affected) {
        res.status(404).json({
          error: "Catégorie non trouvée",
        });
        return;
      }

      res.json({
        message: "Catégorie mise à jour",
      });
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
    }
  },

  // DELETE /api/categories/:id
  delete: async (req: Request, res: Response) => {
    try {
      const affected = await CategoryModel.delete(Number(req.params.id));
      if (!affected) {
        res.status(404).json({ error: "Catégorie non trouvée" });
        return;
      }
      res.json({ message: "Catégorie supprimée" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },
};

export default CategoryController;
