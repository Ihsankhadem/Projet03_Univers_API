import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Event {
  id?: number;
  title: string;
  date: string;
  start_time: string;
  end_time?: string | null;
  location: string;
  image?: string | null;
  external_url: string;
}

interface EventRow extends RowDataPacket {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string | null;
  location: string;
  image: string | null;
  external_url: string;
}

const EventModel = {
  // ================= TOUS LES ÉVÉNEMENTS =================
  findAll: async () => {
    const [rows] = await pool.query<EventRow[]>(
      `SELECT *
        FROM events
        ORDER BY date ASC, start_time ASC `,
    );

    return rows;
  },

  // ================= UN ÉVÉNEMENT =================
  findById: async (id: number) => {
    const [rows] = await pool.query<EventRow[]>(
      `SELECT *
        FROM events
        WHERE id = ? `,
      [id],
    );

    return rows[0] || null;
  },

  // ================= CREATE =================
  create: async (data: Event) => {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO events (
          title,
          date,
          start_time,
          end_time,
          location,
          image,
          external_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?) `,
      [
        data.title,
        data.date,
        data.start_time,
        data.end_time ?? null,
        data.location,
        data.image ?? null,
        data.external_url,
      ],
    );

    return result.insertId;
  },

  // ================= UPDATE =================
  update: async (id: number, data: Event) => {
    const [result] = await pool.query<ResultSetHeader>(
      ` UPDATE events
        SET
          title = ?,
          date = ?,
          start_time = ?,
          end_time = ?,
          location = ?,
          image = ?,
          external_url = ?
        WHERE id = ? `,
      [
        data.title,
        data.date,
        data.start_time,
        data.end_time ?? null,
        data.location,
        data.image ?? null,
        data.external_url,
        id,
      ],
    );

    return result.affectedRows;
  },

  // ================= DELETE =================
  delete: async (id: number) => {
    const [result] = await pool.query<ResultSetHeader>(
      ` DELETE FROM events
        WHERE id = ? `,
      [id],
    );

    return result.affectedRows;
  },
};

export default EventModel;
