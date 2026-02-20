import {z} from 'zod';

export const productSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().int().nonnegative(),
  vendorId: z.string().cuid(),
  categoryId: z.string().cuid()
});
