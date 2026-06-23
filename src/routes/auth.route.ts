// src/routes/auth.route.ts
import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

router.post(
  "/change-password",
  (req, _res, next) => {
    next();
  },
  validate(changePasswordSchema),
  authenticate,
  AuthController.changePassword,
);

export default router;
