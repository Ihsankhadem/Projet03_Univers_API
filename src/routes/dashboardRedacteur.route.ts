// src/routes/DashboardRedacteur.route.ts
import express from "express";
import DashboardRedacteurController from "../controllers/dashboardRedacteur.controller.js";

import { authenticate, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate, requireRole(["rédacteur", "administrateur"]));

router.get(
  "/all-articles",
  authenticate,
  requireRole(["rédacteur", "administrateur"]),
  DashboardRedacteurController.getAllArticles,
);

router.get("/stats", DashboardRedacteurController.getStats);

router.get("/articles", DashboardRedacteurController.getArticles);

router.get("/articles/:id", DashboardRedacteurController.getArticleById);

router.post("/articles", DashboardRedacteurController.addArticle);

router.put("/articles/:id", DashboardRedacteurController.updateArticle);

router.delete("/articles/:id", DashboardRedacteurController.deleteArticle);

export default router;
