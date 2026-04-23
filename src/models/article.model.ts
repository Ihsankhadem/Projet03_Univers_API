// src/models/article.model.ts
import pool from "../config/db";

export interface Article {
  id?: number;
  title: string;
  content: string;
  image?: string | null;
  author_id: number;
  category_id?: number | null;
  status?: "brouillon" | "publié";
  views?: number;
  created_at?: string;
}

const ArticleModel = {
  // Tous les articles publiés
  findAll: async () => {
    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.image, a.views, a.created_at, a.status,
              a.category_id,
              u.name AS author, c.name AS category
      FROM articles a
      JOIN users u            ON a.author_id   = u.id_user
      LEFT JOIN categories c  ON a.category_id = c.id
      WHERE a.status = 'publié'
      ORDER BY a.created_at DESC`
    );
    return rows;
  },

  // Tous les articles (admin)
  findAllAdmin: async () => {
    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.image, a.views, a.created_at, a.status,
              a.category_id,
              u.name AS author, c.name AS category
      FROM articles a
      JOIN users u            ON a.author_id   = u.id_user
      LEFT JOIN categories c  ON a.category_id = c.id
      ORDER BY a.created_at DESC`
    );
    return rows;
  },

  // Articles d'un rédacteur spécifique
  findByAuthor: async (author_id: number) => {
    const [rows] = await pool.query(
      `SELECT a.id, a.title, a.image, a.views, a.created_at, a.status,
              a.category_id,
              u.name AS author, c.name AS category
      FROM articles a
      JOIN users u            ON a.author_id   = u.id_user
      LEFT JOIN categories c  ON a.category_id = c.id
      WHERE a.author_id = ?
      ORDER BY a.created_at DESC`,
      [author_id]
    );
    return rows;
  },

  // Un article par ID
  findById: async (id: number) => {
  const [rows]: any = await pool.query(
    `SELECT a.*, c.name AS category
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.id = ?`,
    [id]
  );
    return rows[0] || null;
  },

  // Créer un article
  create: async (data: Article) => {
    const [result]: any = await pool.query(
      `INSERT INTO articles (title, content, image, author_id, category_id, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.content,
        data.image ?? null,
        data.author_id,
        data.category_id ?? null,
        data.status ?? "brouillon",
      ]
    );
    return result.insertId as number;
  },

  // Mettre à jour un article
  update: async (id: number, data: Partial<Article>) => {
    const [result]: any = await pool.query(
      `UPDATE articles SET title=?, content=?, image=?, category_id=?, status=?
       WHERE id=?`,
      [
        data.title,
        data.content,
        data.image ?? null,
        data.category_id ?? null,
        data.status,
        id,
      ]
    );
    return result.affectedRows as number;
  },

  // Incrémenter les vues
  incrementViews: async (id: number) => {
    await pool.query("UPDATE articles SET views = views + 1 WHERE id = ?", [id]);
  },

  // Supprimer un article
  delete: async (id: number) => {
    const [result]: any = await pool.query(
      "DELETE FROM articles WHERE id = ?",
      [id]
    );
    return result.affectedRows as number;
  }
};

export default ArticleModel;