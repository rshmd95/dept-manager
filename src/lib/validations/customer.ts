import {z} from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  address: z.string().optional()
});

export type CustomerInput = z.infer<typeof customerSchema>;
