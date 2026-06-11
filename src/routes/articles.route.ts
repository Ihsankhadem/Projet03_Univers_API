// src/routes/articles.ts

import { Router } from "express";
import ArticleController from "../controllers/article.controller.js";
import { authenticate, requireRole } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createArticleSchema,
  updateArticleSchema,
} from "../validators/article.validator.js";

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

// GET one
router.get("/:id", ArticleController.getOne);

// POST
router.post(
  "/",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  validate(createArticleSchema),
  ArticleController.create,
);

// PUT
router.put(
  "/:id",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  validate(updateArticleSchema),
  ArticleController.update,
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  validate(updateArticleSchema),
  ArticleController.delete,
);

export default router;
