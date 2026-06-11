import { Router } from "express";
import SpaceXController from "../controllers/spacex.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  getLatestSchema,
  getByIdSchema,
} from "../validators/spacex.validator.js";

const router = Router();

router.get("/upcoming", SpaceXController.getUpcoming);

router.get("/latest", validate(getLatestSchema), SpaceXController.getLatest);

router.get("/:id", validate(getByIdSchema), SpaceXController.getById);

export default router;
