import { Router } from "express";
import UploadController from "../controllers/upload.controller.js";
import { authenticate, requireRole } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();
router.post(
  "/",
  authenticate,
  requireRole(["administrateur", "rédacteur"]),
  upload.single("file"),
  UploadController.upload,
);

export default router;
