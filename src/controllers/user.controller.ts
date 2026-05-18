// src/controllers/user.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import { sendTemporaryPasswordEmail } from "../services/MailRedacteur.service.js";
import { generateTempPassword } from "../utils/generateTempPassword.js";

const UserController = {
  findAll: async (_req: Request, res: Response) => {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { name, email, role } = req.body;

      // EMAIL EXISTE
      const existing = await UserModel.findByEmail(email);

      if (existing) {
        return res.status(400).json({
          message: "Cet email existe déjà",
        });
      }

      // PASSWORD TEMPORAIRE
      const tempPassword = generateTempPassword();

      // HASH PASSWORD
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      // CREATE USER
      const userId = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // SEND MAIL
      await sendTemporaryPasswordEmail(email, name, tempPassword);

      return res.status(201).json({
        success: true,
        userId,
      });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      // isNaN = Vérifie si id n’est pas un nombre.
      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "ID invalide",
        });
      }

      await UserModel.delete(id);
      res.json({
        message: "Utilisateur supprimé",
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      await UserModel.update(Number(req.params.id), req.body);

      res.json({
        message: "Utilisateur mis à jour",
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },
};

export default UserController;
