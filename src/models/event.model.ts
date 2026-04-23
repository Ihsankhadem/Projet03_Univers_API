

import pool from "../config/db";

export interface Event {
  id?: number;
  title: string;
  date: string;
  location?: string | null;
  image?: string | null;
  description?: string | null;
}

const EventModel = {
  // Tous les événements
  findAll: async () => {
    const [rows] = await pool.query(
      "SELECT * FROM events ORDER BY date ASC"
    );
    return rows;
  },

  // Un événement par ID
  findById: async (id: number) => {
    const [rows]: any = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  // Créer un événement
  create: async (data: Event) => {
    const [result]: any = await pool.query(
      `INSERT INTO events (title, date, location, image, description)
       VALUES (?, ?, ?, ?, ?)`,
      [data.title, data.date, data.location ?? null, data.image ?? null, data.description ?? null]
    );
    return result.insertId as number;
  },

  // Supprimer un événement
  delete: async (id: number) => {
    const [result]: any = await pool.query(
      "DELETE FROM events WHERE id = ?",
      [id]
    );
    return result.affectedRows as number;
  },
};

export default EventModel;