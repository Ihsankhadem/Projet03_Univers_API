// validators/user.validator.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(["rédacteur", "administrateur"]).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  role: z.enum(["rédacteur", "administrateur"]).optional(),
  password: z.string().min(8).max(64).optional(),
});
