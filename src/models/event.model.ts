import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Event {
  id?: number;
  title: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
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

const formatEvent = (event: EventRow): Event => ({
  ...event,
  date: event.date?.toString().slice(0, 10),
});

const EventModel = {
  // ================= GET ALL =================
  findAll: async (): Promise<Event[]> => {
    const [rows] = await pool.query<EventRow[]>(
      `SELECT * FROM events ORDER BY date ASC, start_time ASC`,
    );

    return rows.map(formatEvent);
  },

  // ================= GET BY ID =================
  findById: async (id: number): Promise<Event | null> => {
    const [rows] = await pool.query<EventRow[]>(
      `SELECT * FROM events WHERE id = ?`,
      [id],
    );

    if (!rows[0]) return null;

    return formatEvent(rows[0]);
  },

  // ================= CREATE =================
  create: async (data: Event): Promise<number> => {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO events (
        title,
        date,
        start_time,
        end_time,
        location,
        image,
        external_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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
  update: async (id: number, data: Event): Promise<number> => {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE events SET
        title = ?,
        date = ?,
        start_time = ?,
        end_time = ?,
        location = ?,
        image = ?,
        external_url = ?
      WHERE id = ?`,
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
  delete: async (id: number): Promise<number> => {
    const [result] = await pool.query<ResultSetHeader>(
      `DELETE FROM events WHERE id = ?`,
      [id],
    );

    return result.affectedRows;
  },
};

export default EventModel;
