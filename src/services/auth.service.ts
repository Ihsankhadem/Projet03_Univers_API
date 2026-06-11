import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { AppError } from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) throw new Error("JWT_SECRET manquant");

const AuthService = {
  async register(data: { name: string; email: string; password: string }) {
    const email = data.email.trim().toLowerCase();

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new AppError("Email déjà utilisé", 409);
    }

    const hashed = await bcrypt.hash(data.password, 12);

    const id = await UserModel.create({
      name: data.name.trim(),
      email,
      password: hashed,
      role: "rédacteur",
      must_change_password: false,
    });

    return { id, message: "Utilisateur créé" };
  },

  async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email.trim().toLowerCase());

    if (!user) {
      throw new AppError("Identifiants invalides", 401);
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      throw new AppError("Identifiants invalides", 401);
    }

    const token = jwt.sign({ id: user.id_user, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      mustChangePassword: user.must_change_password,
      user: {
        id: user.id_user,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async changePassword(userId: number, password: string) {
    const hashed = await bcrypt.hash(password, 12);

    await UserModel.update(userId, {
      password: hashed,
      must_change_password: false,
    });

    return { message: "Mot de passe modifié" };
  },
};

export default AuthService;
