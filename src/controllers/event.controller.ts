
import { Request, Response } from "express";
import EventModel from "../models/event.model";

const EventController = {
  // GET /api/events
  getAll: async (_req: Request, res: Response) => {
    try {
      const events = await EventModel.findAll();
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // GET /api/events/:id
  getOne: async (req: Request, res: Response) => {
    try {
      const event = await EventModel.findById(Number(req.params.id));
      if (!event) {
        res.status(404).json({ error: "Événement non trouvé" });
        return;
      }
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // POST /api/events
  create: async (req: Request, res: Response) => {
    try {
      const { title, date, location, image, description } = req.body;
      if (!title || !date) {
        res.status(400).json({ error: "Champs obligatoires manquants (title, date)" });
        return;
      }
      const id = await EventModel.create({ title, date, location, image, description });
      res.status(201).json({ id, message: "Événement créé avec succès" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },

  // DELETE /api/events/:id
  delete: async (req: Request, res: Response) => {
    try {
      const affected = await EventModel.delete(Number(req.params.id));
      if (!affected) {
        res.status(404).json({ error: "Événement non trouvé" });
        return;
      }
      res.json({ message: "Événement supprimé" });
    } catch (err) {
      res.status(500).json({ error: "Erreur serveur", details: err });
    }
  },
};

export default EventController;