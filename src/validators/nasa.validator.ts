// src/validators/nasa.validator.ts
import { z } from "zod";

export const getLastSchema = z.object({
  count: z.coerce
    .number()
    .int()
    .min(1, "Minimum 1")
    .max(100, "Maximum 100")
    .default(10),
});

export const getRangeSchema = z.object({
  start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date de début invalide",
  }),

  end: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date de fin invalide",
  }),
});
