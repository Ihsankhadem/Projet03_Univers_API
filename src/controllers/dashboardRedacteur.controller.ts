import { Response } from "express";
import DashboardRedacteurModel from "../models/dashboardRedacteur.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

const DashboardRedacteurController = {
  async getAllArticles(req: AuthRequest, res: Response) {
    try {
      const search = (req.query.search as string) || "";

      const articles = await DashboardRedacteurModel.getAllArticles(search);

      res.json(articles);
    } catch (err) {
      res.status(500).json({
        error: "Erreur récupération des articles",
      });
    }
  },

  async getStats(req: AuthRequest, res: Response) {
    try {
      const stats = await DashboardRedacteurModel.getStats(req.user!.id);

      res.json(stats);
    } catch (err) {
      res.status(500).json({
        error: "Erreur récupération statistiques",
      });
    }
  },

  async getArticles(req: AuthRequest, res: Response) {
    try {
      const search = (req.query.search as string) || "";

      const articles = await DashboardRedacteurModel.getArticles(
        req.user!.id,
        search,
      );

      res.json(articles);
    } catch {
      res.status(500).json({
        error: "Erreur récupération articles",
      });
    }
  },

  async getArticleById(req: AuthRequest, res: Response) {
    try {
      const article = await DashboardRedacteurModel.getArticleById(
        Number(req.params.id),
        req.user!.id,
      );

      res.json(article);
    } catch {
      res.status(500).json({
        error: "Erreur récupération article",
      });
    }
  },

  async addArticle(req: AuthRequest, res: Response) {
    try {
      const { title, content, image, category_id, status } = req.body;

      const articleId = await DashboardRedacteurModel.addArticle({
        title,
        content,
        image,
        category_id,
        status,
        author_id: req.user!.id,
      });

      res.json({
        success: true,
        articleId,
      });
    } catch {
      res.status(500).json({
        error: "Erreur ajout article",
      });
    }
  },

  async updateArticle(req: AuthRequest, res: Response) {
    try {
      await DashboardRedacteurModel.updateArticle(
        Number(req.params.id),
        req.user!.id,
        req.body,
      );

      res.json({ success: true });
    } catch {
      res.status(500).json({
        error: "Erreur modification article",
      });
    }
  },

  async deleteArticle(req: AuthRequest, res: Response) {
    try {
      await DashboardRedacteurModel.deleteArticle(
        Number(req.params.id),
        req.user!.id,
      );

      res.json({ success: true });
    } catch {
      res.status(500).json({
        error: "Erreur suppression article",
      });
    }
  },
};

export default DashboardRedacteurController;
