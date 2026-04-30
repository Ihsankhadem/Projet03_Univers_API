import { Router } from "express";
import EventController from "../controllers/event.controller";

const router = Router();

router.get("/", EventController.getAll);
router.get("/:id", EventController.getOne);
router.post("/", EventController.create);
router.delete("/:id", EventController.delete);

export default router;
