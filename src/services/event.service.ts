import EventModel from "../models/event.model.js";
import { AppError } from "../errors/AppError.js";

const EventService = {
  getAll() {
    return EventModel.findAll();
  },

  async getOne(id: number) {
    const event = await EventModel.findById(id);

    if (!event) {
      throw new AppError("Événement non trouvé", 404);
    }

    return event;
  },

  async create(data: any) {
    const id = await EventModel.create(data);

    return {
      id,
      message: "Événement créé",
    };
  },

  async update(id: number, data: any) {
    const affected = await EventModel.update(id, data);

    if (!affected) {
      throw new AppError("Événement non trouvé", 404);
    }

    return {
      message: "Événement mis à jour",
    };
  },

  async delete(id: number) {
    const affected = await EventModel.delete(id);

    if (!affected) {
      throw new AppError("Événement non trouvé", 404);
    }

    return {
      message: "Événement supprimé",
    };
  },
};

export default EventService;
