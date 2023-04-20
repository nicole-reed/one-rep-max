import { z } from 'zod';
import { Units } from '../enums/units.enum';

export const exerciseSchema = z.object({
  name: z.string(),
  max: z.number(),
  units: z.nativeEnum(Units),
  id: z.string(),
  userid: z.string(),
});

export const addExerciseRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    max: z.number(),
    units: z.nativeEnum(Units),
  }),
  user: z.object({
    id: z.string(),
  }),
});

export const getExerciseRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const getExercisesByUserIdRequestSchema = z.object({
  params: z.object({
    userid: z.string(),
  }),
});

export type Exercise = z.infer<typeof exerciseSchema>
