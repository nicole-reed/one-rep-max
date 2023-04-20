import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  id: z.string(),
});

export const addUserRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
  }),
});

export const loginUserRequestSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export const getUserRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>
