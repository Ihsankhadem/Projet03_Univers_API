// src/validators/article.validator.ts

import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(3).max(120),

  content: z.string().trim().min(20).max(5000),

  image: z.string().nullable().optional(),

  category_id: z.coerce.number().optional().nullable(),

  status: z.enum(["brouillon", "publié"]).default("brouillon"),
});

export const updateArticleSchema = createArticleSchema.partial();
