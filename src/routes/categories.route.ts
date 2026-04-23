
// categories.route.ts
import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router = Router();

router.get("/",       CategoryController.getAll);
router.get("/:id",    CategoryController.getOne);
router.post("/",      CategoryController.create);
router.delete("/:id", CategoryController.delete);

export default router;