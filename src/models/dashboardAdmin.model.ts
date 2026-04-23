import pool from "../config/db";
import { RowDataPacket } from "mysql2";

interface StatsRow extends RowDataPacket {
  total: number;
  published: number;
  drafts: number;
  suspended: number;
  users: number;
}

const DashboardModel = {
  getStats: async () => {
    const [rows] = await pool.query<StatsRow[]>(`
      SELECT
        (SELECT COUNT(*) FROM articles) as total,
        (SELECT COUNT(*) FROM articles WHERE status='publié') as published,
        (SELECT COUNT(*) FROM articles WHERE status='brouillon') as drafts,
        (SELECT COUNT(*) FROM articles WHERE status='suspendu') as suspended,
        (SELECT COUNT(*) FROM users) as users
    `);

    const stats = rows[0];

    return {
      articles: {
        total: stats.total,
        published: stats.published,
        drafts: stats.drafts,
        suspended: stats.suspended,
      },
      users: stats.users,
    };
  },

  getArticles: async (search: string) => {
    const [rows] = await pool.query<any[]>(
      `
      SELECT 
        a.id,
        a.title,
        a.content,
        a.image,
        a.author_id,
        a.status,
        a.views,
        a.created_at,
        u.name AS author,
        GROUP_CONCAT(c.name) AS categories
      FROM articles a
      JOIN users u ON a.author_id = u.id_user
      LEFT JOIN article_categorie ac ON ac.id_article = a.id
      LEFT JOIN categories c ON ac.id_categorie = c.id
      WHERE a.title LIKE ?
      GROUP BY a.id
      ORDER BY a.created_at DESC
      `,
      [`%${search}%`]
    );

    return rows;
  },

  getArticleById: async (id: number) => {
    const [rows] = await pool.query<any[]>(
      `
      SELECT 
        a.id,
        a.title,
        a.content,
        a.image,
        a.status,
        a.views,
        a.created_at,
        u.name AS author,
        u.id_user AS author_id,
        (
          SELECT ac.id_categorie
          FROM article_categorie ac
          WHERE ac.id_article = a.id
          LIMIT 1
        ) AS category_id,
        (
          SELECT c.name
          FROM article_categorie ac
          JOIN categories c ON c.id = ac.id_categorie
          WHERE ac.id_article = a.id
          LIMIT 1
        ) AS category
      FROM articles a
      JOIN users u ON a.author_id = u.id_user
      WHERE a.id = ?
      `,
      [id]
    );

    return rows[0] || null;
  },

  updateArticle: async (
    id: number,
    { title, content, category_id, status }: 
    { title: string; content: string; category_id: number; status: string }
  ) => {
    await pool.query(
      `UPDATE articles SET title = ?, content = ?, status = ? WHERE id = ?`,
      [title, content, status, id]
    );

    await pool.query(
      `
      INSERT INTO article_categorie (id_article, id_categorie)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE id_categorie = VALUES(id_categorie)
      `,
      [id, category_id]
    );
  },

  updateStatus: async (id: number, status: "publié" | "brouillon" | "suspendu") => {
    await pool.query(
      `UPDATE articles SET status = ? WHERE id = ?`,
      [status, id]
    );
  },

  deleteArticle: async (id: number) => {
  await pool.query(
    `DELETE FROM article_categorie WHERE id_article = ?`,
    [id]
  );

  await pool.query(
    `DELETE FROM articles WHERE id = ?`,
    [id]
  );
},

};

export default DashboardModel;
