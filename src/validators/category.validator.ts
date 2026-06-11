import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(50),
});

export const updateCategorySchema = createCategorySchema.partial();
