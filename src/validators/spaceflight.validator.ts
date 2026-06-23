// spaceflight.validator.ts
import { z } from "zod";

export const getArticlesSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(25),
  offset: z.coerce.number().int().min(0).default(0),
});

export const searchArticlesSchema = z.object({
  q: z.string().min(1, "Query requise"),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export const getByIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
