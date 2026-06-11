// categories.route.ts

import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator.js";
import { authenticate, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

// GET
router.get("/", CategoryController.getAll);
router.get("/stats", CategoryController.getStats);
router.get("/:id", CategoryController.getOne);
router.get("/:id/articles", CategoryController.getArticlesByCategory);

// POST
router.post(
  "/",
  authenticate,
  requireRole(["administrateur"]),
  validate(createCategorySchema),
  CategoryController.create,
);

// PUT
router.put(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  validate(updateCategorySchema),
  CategoryController.update,
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  CategoryController.delete,
);

export default router;
