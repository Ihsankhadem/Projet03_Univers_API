// src/validators/spacex.validator.ts
import { z } from "zod";

export const getLatestSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const getByIdSchema = z.object({
  id: z.string().min(1, "ID requis"),
});
