import { z } from 'zod';

// Auth schemas
export const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y _'),
  country_code: z.string().length(2).default('CL'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Password requerido'),
});

export const magicLinkSchema = z.object({
  email: z.string().email('Email inválido'),
});

// User schemas
export const updateProfileSchema = z.object({
  display_name: z.string().max(100).optional(),
  avatar_url: z.string().url().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).optional(),
    notifications: z.boolean().optional(),
    newsletter: z.boolean().optional(),
  }).optional(),
});

// Search schemas
export const searchQuerySchema = z.object({
  q: z.string().min(1).max(200),
  type: z.enum(['all', 'music', 'courses', 'modules']).default('all'),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// Music schemas
export const musicQuerySchema = z.object({
  genre: z.string().optional(),
  artist: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// Helper to validate request body
export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return { success: false, error: firstError?.message || 'Validation error' };
  }
  return { success: true, data: result.data };
}
