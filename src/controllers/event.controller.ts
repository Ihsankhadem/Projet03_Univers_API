import { Request, Response } from "express";
import EventModel from "../models/event.model.js";

// fichiers a creer : helpers validation simples
const isValidTime = (t: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);

const isValidDate = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d);

const EventController = {
  // ================= GET ALL =================
  getAll: async (_req: Request, res: Response) => {
    try {
      const events = await EventModel.findAll();
      res.json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ================= GET ONE =================
  getOne: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const event = await EventModel.findById(id);

      if (!event) {
        return res.status(404).json({
          error: "Événement non trouvé",
        });
      }

      res.json(event);
    } catch {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ================= CREATE =================
  create: async (req: Request, res: Response) => {
    try {
      const {
        title,
        date,
        start_time,
        end_time,
        location,
        image,
        external_url,
      } = req.body;

      // ================= VALIDATION =================
      if (!title || !date || !start_time || !location || !external_url) {
        return res.status(400).json({
          error: "Champs obligatoires manquants",
        });
      }

      if (!isValidDate(date)) {
        return res.status(400).json({
          error: "Format date invalide (YYYY-MM-DD)",
        });
      }

      if (!isValidTime(start_time)) {
        return res.status(400).json({
          error: "Heure de début invalide",
        });
      }

      if (end_time && !isValidTime(end_time)) {
        return res.status(400).json({
          error: "Heure de fin invalide",
        });
      }

      if (end_time && start_time && end_time <= start_time) {
        return res.status(400).json({
          error: "L'heure de fin doit être après l'heure de début",
        });
      }

      const id = await EventModel.create({
        title,
        date,
        start_time,
        end_time,
        location,
        image,
        external_url,
      });

      res.status(201).json({
        id,
        message: "Événement créé",
      });
    } catch {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ================= UPDATE =================
  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const {
        title,
        date,
        start_time,
        end_time,
        location,
        image,
        external_url,
      } = req.body;

      if (!title || !date || !start_time || !location || !external_url) {
        return res.status(400).json({
          error: "Champs obligatoires manquants",
        });
      }

      if (!isValidDate(date)) {
        return res.status(400).json({
          error: "Format date invalide",
        });
      }

      const affected = await EventModel.update(id, {
        title,
        date,
        start_time,
        end_time,
        location,
        image,
        external_url,
      });

      if (!affected) {
        return res.status(404).json({
          error: "Événement non trouvé",
        });
      }

      res.json({
        message: "Événement mis à jour",
      });
    } catch {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  // ================= DELETE =================
  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const affected = await EventModel.delete(id);

      if (!affected) {
        return res.status(404).json({
          error: "Événement non trouvé",
        });
      }

      res.json({
        message: "Événement supprimé",
      });
    } catch {
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

export default EventController;
