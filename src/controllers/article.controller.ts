import { Request, Response } from "express";
import ArticleModel from "../models/article.model";
import { AuthRequest } from "../middlewares/role.middleware";

const ArticleController = {
  // GET /api/articles
  getAll: async (_req: Request, res: Response) => {
    try {
      const articles = await ArticleModel.findAll();
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // GET /api/articles/admin
  getAllAdmin: async (_req: Request, res: Response) => {
    try {
      const articles = await ArticleModel.findAllAdmin();
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // GET /api/articles/author/:author_id
  getByAuthor: async (req: Request, res: Response) => {
    try {
      const articles = await ArticleModel.findByAuthor(
        Number(req.params.author_id),
      );
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // GET /api/articles/:id
  getOne: async (req: Request, res: Response) => {
    try {
      const article = await ArticleModel.findById(Number(req.params.id));

      if (!article) {
        res.status(404).json({ error: "Article non trouvé" });
        return;
      }

      await ArticleModel.incrementViews(Number(req.params.id));
      res.json(article);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // POST
  create: async (req: AuthRequest, res: Response) => {
    try {
      const { title, content, image, category_id, status } = req.body;
      const author_id = req.user!.id;

      const id = await ArticleModel.create({
        title,
        content,
        image,
        author_id,
        category_id,
        status,
      });

      res.status(201).json({ id, message: "Article créé avec succès" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // PUT
  update: async (req: Request, res: Response) => {
    try {
      const affected = await ArticleModel.update(
        Number(req.params.id),
        req.body,
      );

      if (!affected) {
        res.status(404).json({ error: "Article non trouvé" });
        return;
      }

      res.json({ message: "Article mis à jour" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // DELETE
  delete: async (req: Request, res: Response) => {
    try {
      const affected = await ArticleModel.delete(Number(req.params.id));

      if (!affected) {
        res.status(404).json({ error: "Article non trouvé" });
        return;
      }

      res.json({ message: "Article supprimé" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },
};

export default ArticleController;
