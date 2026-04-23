// src/controllers/dashboardAdmin.controller.ts


import { Request, Response } from "express";
import DashboardModel from "../models/dashboardAdmin.model";

const DashboardController = {
  getStats: async (_req: Request, res: Response) => {
    try {
      const stats = await DashboardModel.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: "Erreur dashboard admin", details: err });
    }
  },

  getArticles: async (req: Request, res: Response) => {
    try {
      const search = (req.query.search as string) || "";
      const articles = await DashboardModel.getArticles(search);
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: "Erreur récupération articles", details: err });
    }
  },

  getArticleById: async (req: Request, res: Response) => {
    try {
      const article = await DashboardModel.getArticleById(Number(req.params.id));
      res.json(article);
    } catch (err) {
      res.status(500).json({ error: "Erreur récupération article", details: err });
    }
  },

  updateArticle: async (req: Request, res: Response) => {
    try {
      const { title, content, category_id, status } = req.body;
      await DashboardModel.updateArticle(Number(req.params.id), { title, content, category_id, status });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Erreur mise à jour article", details: err });
    }
  },

  updateStatus: async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const id = Number(req.params.id);

      await DashboardModel.updateStatus(id, status);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Erreur mise à jour statut", details: err });
    }
  },

  deleteArticle: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await DashboardModel.deleteArticle(id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Erreur suppression article", details: err });
    }
  }

};

export default DashboardController;


