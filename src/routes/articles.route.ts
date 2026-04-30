// src/routes/articles.ts
import { Router } from "express";
import ArticleController from "../controllers/article.controller";
import { authenticate, requireRole } from "../middlewares/auth.middleware";

const router = Router();

// GET all
router.get("/", ArticleController.getAll);

// GET admin
router.get(
  "/admin",
  authenticate,
  requireRole(["administrateur"]),
  ArticleController.getAllAdmin,
);

// GET by author
router.get(
  "/author/:author_id",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  ArticleController.getByAuthor,
);

// TOUJOURS APRÈS les routes spécifiques
router.get("/:id", ArticleController.getOne);

// POST
router.post(
  "/",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  ArticleController.create,
);

// PUT
router.put(
  "/:id",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  ArticleController.update,
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  ArticleController.delete,
);

export default router;
