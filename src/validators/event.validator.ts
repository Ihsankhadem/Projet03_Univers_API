import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createEventSchema = z.object({
  title: z.string().trim().min(3).max(120),

  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format YYYY-MM-DD"),

  start_time: z.string().regex(timeRegex, "Heure invalide"),

  end_time: z.string().regex(timeRegex, "Heure invalide").optional().nullable(),

  location: z.string().min(2).max(255),

  image: z.string().url().optional().nullable(),

  external_url: z.string().url(),
});

export const updateEventSchema = createEventSchema.partial();
