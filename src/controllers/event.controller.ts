import { Request, Response } from "express";
import EventModel from "../models/event.model.js";

const EventController = {
  // ================= GET ALL =================
  getAll: async (_req: Request, res: Response) => {
    try {
      const events = await EventModel.findAll();

      res.json(events);
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
    }
  },

  // ================= GET ONE =================
  getOne: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const event = await EventModel.findById(id);

      if (!event) {
        res.status(404).json({
          error: "Événement non trouvé",
        });

        return;
      }

      res.json(event);
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
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

      // VALIDATION
      if (!title || !date || !start_time || !location || !external_url) {
        res.status(400).json({
          error:
            "Champs obligatoires manquants (title, date, start_time, location, external_url)",
        });

        return;
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
        message: "Événement créé avec succès",
      });
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
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

      // VALIDATION
      if (!title || !date || !start_time || !location || !external_url) {
        res.status(400).json({
          error:
            "Champs obligatoires manquants (title, date, start_time, location, external_url)",
        });

        return;
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
        res.status(404).json({
          error: "Événement non trouvé",
        });

        return;
      }

      res.json({
        message: "Événement mis à jour avec succès",
      });
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
    }
  },

  // ================= DELETE =================
  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const affected = await EventModel.delete(id);

      if (!affected) {
        res.status(404).json({
          error: "Événement non trouvé",
        });

        return;
      }

      res.json({
        message: "Événement supprimé",
      });
    } catch (err) {
      res.status(500).json({
        error: "Erreur serveur",
        details: err,
      });
    }
  },
};

export default EventController;
