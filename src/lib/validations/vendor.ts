import {z} from 'zod';

export const vendorSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  company: z.string().optional(),
  notes: z.string().optional()
});
