// src/routes/user.route.ts

import express from "express";

import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", UserController.findAll);

router.post("/", UserController.createUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export default router;
