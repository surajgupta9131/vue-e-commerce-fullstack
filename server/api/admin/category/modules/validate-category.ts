import z from "zod";
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters")
    .trim(),
});
