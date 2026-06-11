import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import { AppError } from "../errors/AppError.js";
import { generateTempPassword } from "../utils/generateTempPassword.js";
import { sendTemporaryPasswordEmail } from "../services/MailRedacteur.service.js";

const UserService = {
  async getAll() {
    return UserModel.findAll();
  },

  async getStats() {
    return UserModel.getStats();
  },

  async createUser(data: { name: string; email: string; role?: string }) {
    const existing = await UserModel.findByEmail(data.email);

    if (existing) {
      throw new AppError("Cet email existe déjà", 409);
    }

    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const userId = await UserModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role as any,
    });

    await sendTemporaryPasswordEmail(data.email, data.name, tempPassword);

    return {
      userId,
      message: "Utilisateur créé",
    };
  },

  async updateUser(id: number, data: any) {
    await UserModel.update(id, data);

    return {
      message: "Utilisateur mis à jour",
    };
  },

  async deleteUser(id: number) {
    await UserModel.delete(id);

    return {
      message: "Utilisateur supprimé",
    };
  },
};

export default UserService;
