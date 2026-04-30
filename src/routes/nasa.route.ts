import { Router } from "express";
import NasaController from "../controllers/nasa.controller";

const router = Router();

router.get("/apod", NasaController.getToday);
router.get("/apod/last", NasaController.getLast);
router.get("/apod/range", NasaController.getRange);

export default router;
