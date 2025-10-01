import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  price: z.string().min(1, "Price is required"),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
  // images: z.array(z.any()).optional(), // Adjust based on your Image schema
});
