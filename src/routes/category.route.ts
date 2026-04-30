// categories.route.ts
import express from "express";
import CategoryController from "../controllers/category.controller";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.get("/:id/articles", CategoryController.getArticlesByCategory);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
