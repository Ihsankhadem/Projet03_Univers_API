// models/category.model.ts
import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Category {
  id?: number;
  name: string;
}

interface CategoryRow extends RowDataPacket {
  id: number;
  name: string;
  total_articles?: number;
}

const CategoryModel = {
  findAll: async (search = "") => {
    const [rows] = await pool.query<CategoryRow[]>(
      `
      SELECT
        c.id,
        c.name,
        COUNT(ac.id_article) AS total_articles
      FROM categories c
      LEFT JOIN article_categorie ac
        ON ac.id_categorie = c.id
      WHERE c.name LIKE ?
      GROUP BY c.id
      ORDER BY c.name ASC
      `,
      [`%${search}%`],
    );

    return rows;
  },

  // ---------------- Une catégorie ----------------
  findById: async (id: number) => {
    const [rows] = await pool.query<CategoryRow[]>(
      "SELECT * FROM categories WHERE id = ?",
      [id],
    );

    return rows[0] || null;
  },

  getArticlesByCategory: async (categoryId: number) => {
    const [rows] = await pool.query(
      `
    SELECT a.id, a.title, a.created_at
    FROM articles a
    INNER JOIN article_categorie ac ON ac.id_article = a.id
    WHERE ac.id_categorie = ?
    ORDER BY a.created_at DESC
    `,
      [categoryId],
    );

    return rows;
  },

  // ---------------- Créer ----------------
  create: async (name: string) => {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO categories (name) VALUES (?)",
      [name],
    );

    return result.insertId;
  },

  // ---------------- Modifier ----------------
  update: async (id: number, name: string) => {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE categories SET name = ? WHERE id = ?",
      [name, id],
    );

    return result.affectedRows;
  },

  // ---------------- Supprimer ----------------
  delete: async (id: number) => {
    // enlève relation article/category
    await pool.query("DELETE FROM article_categorie WHERE id_categorie = ?", [
      id,
    ]);

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM categories WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  },
};

export default CategoryModel;
