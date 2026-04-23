import express from "express";
import { authenticate, requireRole } from "../middlewares/auth.middleware";
import DashboardAdminController from "../controllers/dashboardAdmin.controller";
import { dir } from "node:console";

const router = express.Router();

router.get(
  "/stats",
  authenticate,
  requireRole(["administrateur"]),
  DashboardAdminController.getStats
);

router.get(
  "/articles",
  authenticate,
  requireRole(["administrateur"]),
  DashboardAdminController.getArticles
);

router.get(
  "/articles/:id",
  authenticate,
  requireRole(["administrateur"]),
  DashboardAdminController.getArticleById
);

router.put(
  "/articles/:id",
  authenticate,
  requireRole(["administrateur"]),
  DashboardAdminController.updateArticle
);

router.put(
  "/articles/:id/status",
  authenticate,
  requireRole(["administrateur"]),
  DashboardAdminController.updateStatus
);

router.delete(
  "/articles/:id",
  authenticate,
  requireRole(["administrateur"]),
  DashboardAdminController.deleteArticle
);

export default router;
