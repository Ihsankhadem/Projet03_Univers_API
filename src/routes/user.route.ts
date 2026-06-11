// src/routes/user.route.ts
import express from "express";
import UserController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator.js";
import { authenticate, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  requireRole(["administrateur"]),
  UserController.findAll,
);

router.get(
  "/stats",
  authenticate,
  requireRole(["administrateur"]),
  UserController.getStats,
);

router.post(
  "/",
  authenticate,
  requireRole(["administrateur"]),
  validate(createUserSchema),
  UserController.createUser,
);

router.put(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  validate(updateUserSchema),
  UserController.updateUser,
);

router.delete(
  "/:id",
  authenticate,
  requireRole(["administrateur"]),
  UserController.deleteUser,
);

export default router;
