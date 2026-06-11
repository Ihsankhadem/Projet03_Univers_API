import SpaceXModel, { SpaceXLaunch } from "../models/spacex.model.js";
import { AppError } from "../errors/AppError.js";

const SpaceXService = {
  getUpcoming: async (): Promise<SpaceXLaunch[]> => {
    return SpaceXModel.getUpcoming();
  },

  getLatest: async (limit: number): Promise<SpaceXLaunch[]> => {
    return SpaceXModel.getLatest(limit);
  },

  getById: async (id: string): Promise<SpaceXLaunch> => {
    const data = await SpaceXModel.getById(id);

    if (!data) {
      throw new AppError("Lancement SpaceX non trouvé", 404);
    }

    return data;
  },
};

export default SpaceXService;
