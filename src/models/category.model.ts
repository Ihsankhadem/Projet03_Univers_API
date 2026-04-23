
import pool from "../config/db";

export interface Category {
  id?: number;
  name: string;
}

const CategoryModel = {
  // Toutes les catégories
  findAll: async () => {
    const [rows] = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    return rows;
  },

  // Une catégorie par ID
  findById: async (id: number) => {
    const [rows]: any = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  // Créer une catégorie
  create: async (name: string) => {
    const [result]: any = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    return result.insertId as number;
  },

  // Supprimer une catégorie
  delete: async (id: number) => {
    const [result]: any = await pool.query(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );
    return result.affectedRows as number;
  },
};

export default CategoryModel;