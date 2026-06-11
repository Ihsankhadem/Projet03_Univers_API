import { Router } from "express";
import SpaceflightController from "../controllers/spaceflight.controller.js";

import { validateQuery } from "../middlewares/validateQuery.middleware.js";

import {
  getArticlesSchema,
  searchArticlesSchema,
} from "../validators/spaceflight.validator.js";

const router = Router();

router.get(
  "/articles",
  validateQuery(getArticlesSchema),
  SpaceflightController.getArticles,
);

router.get(
  "/articles/search",
  validateQuery(searchArticlesSchema),
  SpaceflightController.search,
);

router.get("/articles/:id", SpaceflightController.getById);

export default router;
