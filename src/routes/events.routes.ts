import { Router } from "express";
import EventController from "../controllers/event.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../validators/event.validator.js";
import { authenticate, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", EventController.getAll);
router.get("/:id", EventController.getOne);

// CREATE
router.post(
  "/",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  validate(createEventSchema),
  EventController.create,
);

// UPDATE
router.put(
  "/:id",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  validate(updateEventSchema),
  EventController.update,
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  EventController.delete,
);

export default router;
