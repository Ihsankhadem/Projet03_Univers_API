import { Request, Response, NextFunction } from "express";
import EventService from "../services/event.service.js";

const EventController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await EventService.getAll();
      res.json(events);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await EventService.getOne(Number(req.params.id));
      res.json(event);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await EventService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await EventService.update(Number(req.params.id), req.body);

      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await EventService.delete(Number(req.params.id));
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default EventController;
