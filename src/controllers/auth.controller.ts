import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET manquant dans .env");
}

const AuthController = {
  // REGISTER
  register: async (req: Request, res: Response) => {
    try {
      let { name, email, password } = req.body;

      // Normalisation
      name = name?.trim();
      email = email?.trim().toLowerCase();

      // Validation
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Tous les champs sont requis",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Email invalide",
        });
      }

      if (password.length < 8 || password.length > 64) {
        return res.status(400).json({
          message: "Mot de passe invalide (8 à 64 caractères)",
        });
      }

      if (name.length < 2 || name.length > 100) {
        return res.status(400).json({
          message: "Nom invalide",
        });
      }

      // Vérification utilisateur existant
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          message: "Email déjà utilisé",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Création utilisateur
      const userId = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: "rédacteur", 
      });

      return res.status(201).json({
        message: "Utilisateur créé",
        userId,
      });
    } catch (error) {
      console.error("❌ Register error:", error);
      return res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },

  // LOGIN
  login: async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;

      // Validation basique
      if (!email || !password) {
        return res.status(400).json({
          message: "Identifiants invalides",
        });
      }

      email = email.trim().toLowerCase();

      const user = await UserModel.findByEmail(email);

      // ⚠️ message volontairement vague
      if (!user) {
        return res.status(401).json({
          message: "Identifiants invalides",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Identifiants invalides",
        });
      }

      // Génération JWT
      const token = jwt.sign(
        {
          id: user.id_user,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token,
        user: {
          id: user.id_user,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("❌ Login error:", error);
      return res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },
};

export default AuthController;