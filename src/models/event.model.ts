import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Event {
  id?: number;
  title: string;
  date: string;
  location?: string | null;
  image?: string | null;
  description?: string | null;
}

interface EventRow extends RowDataPacket {
  id: number;
  title: string;
  date: string;
  location: string | null;
  image: string | null;
  description: string | null;
}

const EventModel = {
  // Tous les événements
  findAll: async () => {
    const [rows] = await pool.query<EventRow[]>(
      "SELECT * FROM events ORDER BY date ASC",
    );

    return rows;
  },

  // Un événement par ID
  findById: async (id: number) => {
    const [rows] = await pool.query<EventRow[]>(
      "SELECT * FROM events WHERE id = ?",
      [id],
    );

    return rows[0] || null;
  },

  // Créer un événement
  create: async (data: Event) => {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO events (title, date, location, image, description)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.title,
        data.date,
        data.location ?? null,
        data.image ?? null,
        data.description ?? null,
      ],
    );

    return result.insertId;
  },

  // Supprimer un événement
  delete: async (id: number) => {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM events WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  },
};

export default EventModel;