import { Router } from "express";
import SpaceXController from "../controllers/spacex.controller";

const router = Router();

router.get("/upcoming", SpaceXController.getUpcoming);
router.get("/latest", SpaceXController.getLatest);
router.get("/:id", SpaceXController.getById);

export default router;
