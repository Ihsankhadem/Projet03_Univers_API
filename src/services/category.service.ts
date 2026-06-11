// src/services/category.service.ts
import CategoryModel from "../models/category.model.js";
import { AppError } from "../errors/AppError.js";

const CategoryService = {
  getAll(search?: string) {
    return CategoryModel.findAll(search);
  },

  getStats() {
    return CategoryModel.getStats();
  },

  async getOne(id: number) {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new AppError("Catégorie non trouvée", 404);
    }

    return category;
  },

  getArticlesByCategory(id: number) {
    return CategoryModel.getArticlesByCategory(id);
  },

  async create(name: string) {
    const id = await CategoryModel.create(name);

    return {
      id,
      message: "Catégorie créée avec succès",
    };
  },

  async update(id: number, name: string) {
    const affected = await CategoryModel.update(id, name);

    if (!affected) {
      throw new AppError("Catégorie non trouvée", 404);
    }

    return {
      message: "Catégorie mise à jour",
    };
  },

  async delete(id: number) {
    const affected = await CategoryModel.delete(id);

    if (!affected) {
      throw new AppError("Catégorie non trouvée", 404);
    }

    return {
      message: "Catégorie supprimée",
    };
  },
};

export default CategoryService;
