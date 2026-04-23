import pool from "../config/db";  
import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id_user: number;
  name: string;
  email: string;
  password: string;
  role: "rédacteur" | "administrateur";
  created_at: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role?: "rédacteur" | "administrateur";
}

const UserModel = {
  // FIND BY EMAIL
  findByEmail: async (email: string): Promise<User | null> => {
    const [rows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    return rows.length ? rows[0] : null;
  },

  // FIND BY ID
  findById: async (id: number): Promise<User | null> => {
    const [rows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE id_user = ? LIMIT 1",
      [id]
    );

    return rows.length ? rows[0] : null;
  },

  // CREATE USER
    create: async (user: CreateUser): Promise<number> => {
      const [result]: any = await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [user.name, user.email, user.password, user.role ?? "rédacteur"]
      );

      return result.insertId;
    },

  // DELETE USER
  delete: async (id: number): Promise<void> => {
    await pool.query("DELETE FROM users WHERE id_user = ?", [id]);
  },

  // UPDATE USER 
  update: async (
    id: number,
    data: Partial<User>
  ): Promise<void> => {
    const { name, email, password, role } = data;

    await pool.query(
      `UPDATE users 
       SET name = COALESCE(?, name),
           email = COALESCE(?, email),
           password = COALESCE(?, password),
           role = COALESCE(?, role)
       WHERE id_user = ?`,
      [name, email, password, role, id]
    );
  },
};

export default UserModel;