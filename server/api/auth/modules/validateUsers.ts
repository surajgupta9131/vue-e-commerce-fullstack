import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),

  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const signupSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters")
    .trim(),

  email: z.string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase()
    .max(100, "Email must be less than 100 characters"),

  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be less than 50 characters"),
});