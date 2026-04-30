import { Router } from "express";
import SpaceflightController from "../controllers/spaceflight.controller";

const router = Router();

router.get("/articles", SpaceflightController.getArticles);
router.get("/articles/search", SpaceflightController.search);
router.get("/articles/:id", SpaceflightController.getById);

export default router;
