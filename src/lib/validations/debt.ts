import {DebtStatus} from '@prisma/client';
import {z} from 'zod';

export const debtSchema = z.object({
  customerId: z.string().cuid(),
  amount: z.coerce.number().positive(),
  debtDate: z.coerce.date(),
  dueDate: z.coerce.date().optional(),
  status: z.nativeEnum(DebtStatus),
  notes: z.string().optional()
});
