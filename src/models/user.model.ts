import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface User extends RowDataPacket {
  id_user: number;
  name: string;
  email: string;
  password: string;
  role: "rédacteur" | "administrateur";
  must_change_password: boolean;
  created_at: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role?: "rédacteur" | "administrateur";
  must_change_password?: boolean;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: "rédacteur" | "administrateur";
  must_change_password?: boolean;
}

export interface UserWithStats extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: "rédacteur" | "administrateur";
  must_change_password: boolean;
  created_at: string;
  total_articles: number;
}

const UserModel = {
  findAll: async (): Promise<UserWithStats[]> => {
    const [rows] = await pool.query<UserWithStats[]>(`
      SELECT u.id_user AS id, u.name, u.email, u.role, u.must_change_password, u.created_at,
      COUNT(a.id) AS total_articles
      FROM users u
      LEFT JOIN articles a ON a.author_id = u.id_user
      GROUP BY u.id_user, u.name, u.email, u.role, u.must_change_password, u.created_at
      ORDER BY u.created_at DESC
    `);
    return rows;
  },

  findByEmail: async (email: string): Promise<User | null> => {
    const [rows] = await pool.query<User[]>(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email],
    );
    return rows.length ? rows[0] : null;
  },

  findById: async (id: number): Promise<User | null> => {
    const [rows] = await pool.query<User[]>(
      `SELECT * FROM users WHERE id_user = ? LIMIT 1`,
      [id],
    );
    return rows.length ? rows[0] : null;
  },

  create: async (user: CreateUser): Promise<number> => {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (name, email, password, role, must_change_password) VALUES (?, ?, ?, ?, ?)`,
      [
        user.name,
        user.email,
        user.password,
        user.role ?? "rédacteur",
        user.must_change_password ?? true,
      ],
    );
    return result.insertId;
  },

  delete: async (id: number): Promise<void> => {
    await pool.query(`DELETE FROM users WHERE id_user = ?`, [id]);
  },

  update: async (id: number, data: UpdateUser): Promise<void> => {
    const { name, email, password, role, must_change_password } = data;
    await pool.query(
      `UPDATE users SET
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        password = COALESCE(?, password),
        role = COALESCE(?, role),
        must_change_password = COALESCE(?, must_change_password)
      WHERE id_user = ?`,
      [name, email, password, role, must_change_password, id],
    );
  },
};

export default UserModel;
