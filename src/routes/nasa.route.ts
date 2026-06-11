import { Router } from "express";
import NasaController from "../controllers/nasa.controller.js";
import { getLastSchema, getRangeSchema } from "../validators/nasa.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/apod", NasaController.getToday);
router.get("/apod/last", validate(getLastSchema), NasaController.getLast);
router.get("/apod/range", validate(getRangeSchema), NasaController.getRange);

export default router;
