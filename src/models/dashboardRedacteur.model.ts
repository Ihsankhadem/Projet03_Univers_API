// src/models/dashboardRedacteur.model.ts
import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface StatsRow extends RowDataPacket {
  total: number;
  published: number;
  drafts: number;
  suspended: number;
  views: number;
}

interface ArticleRow extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  image: string | null;
  author_id: number;
  status: string;
  views: number;
  created_at: string;
  categories?: string;
  category_id?: number;
}

const DashboardRedacteurModel = {
  async getAllArticles(search: string) {
    const [rows] = await pool.query<ArticleRow[]>(
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
    JOIN users u
      ON u.id_user = a.author_id
    LEFT JOIN article_categorie ac
      ON ac.id_article = a.id
    LEFT JOIN categories c
      ON c.id = ac.id_categorie
    WHERE a.title LIKE ?
    GROUP BY a.id
    ORDER BY a.created_at DESC
    `,
      [`%${search}%`],
    );

    return rows;
  },

  async getStats(authorId: number) {
    const [rows] = await pool.query<StatsRow[]>(
      `
      SELECT
        COUNT(*) as total,
        SUM(status='publié') as published,
        SUM(status='brouillon') as drafts,
        SUM(status='suspendu') as suspended,
        SUM(views) as views
      FROM articles
      WHERE author_id = ?
      `,
      [authorId],
    );

    const stats = rows[0];

    return {
      articles: {
        total: stats.total || 0,
        published: stats.published || 0,
        drafts: stats.drafts || 0,
        suspended: stats.suspended || 0,
      },
      views: stats.views || 0,
    };
  },

  async getArticles(authorId: number, search: string) {
    const [rows] = await pool.query<ArticleRow[]>(
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
        GROUP_CONCAT(c.name) AS categories
      FROM articles a
      LEFT JOIN article_categorie ac
        ON ac.id_article = a.id
      LEFT JOIN categories c
        ON c.id = ac.id_categorie
      WHERE a.author_id = ?
      AND a.title LIKE ?
      GROUP BY a.id
      ORDER BY a.created_at DESC
      `,
      [authorId, `%${search}%`],
    );

    return rows;
  },

  async getArticleById(id: number, authorId: number) {
    const [rows] = await pool.query<ArticleRow[]>(
      `
      SELECT
        a.*,
        (
          SELECT id_categorie
          FROM article_categorie
          WHERE id_article = a.id
          LIMIT 1
        ) AS category_id
      FROM articles a
      WHERE a.id = ?
      AND a.author_id = ?
      `,
      [id, authorId],
    );

    return rows[0] || null;
  },

  async addArticle({
    title,
    content,
    image,
    author_id,
    category_id,
    status,
  }: {
    title: string;
    content: string;
    image: string;
    author_id: number;
    category_id: number;
    status: string;
  }) {
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO articles
      (
        title,
        content,
        image,
        author_id,
        status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, content, image, author_id, status],
    );

    const articleId = result.insertId;

    await pool.query(
      `
      INSERT INTO article_categorie
      (
        id_article,
        id_categorie
      )
      VALUES (?, ?)
      `,
      [articleId, category_id],
    );

    return articleId;
  },

  async updateArticle(
    id: number,
    authorId: number,
    data: {
      title: string;
      content: string;
      image: string;
      category_id: number;
      status: string;
    },
  ) {
    await pool.query(
      `
      UPDATE articles
      SET
        title = ?,
        content = ?,
        image = ?,
        status = ?
      WHERE id = ?
      AND author_id = ?
      `,
      [data.title, data.content, data.image, data.status, id, authorId],
    );

    await pool.query(
      `
      UPDATE article_categorie
      SET id_categorie = ?
      WHERE id_article = ?
      `,
      [data.category_id, id],
    );
  },

  async deleteArticle(id: number, authorId: number) {
    await pool.query(
      `
      DELETE ac
      FROM article_categorie ac
      JOIN articles a
        ON a.id = ac.id_article
      WHERE a.id = ?
      AND a.author_id = ?
      `,
      [id, authorId],
    );

    await pool.query(
      `
      DELETE FROM articles
      WHERE id = ?
      AND author_id = ?
      `,
      [id, authorId],
    );
  },
};

export default DashboardRedacteurModel;
