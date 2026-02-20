'use server';

import {revalidatePath} from 'next/cache';
import {prisma} from '@/lib/db/prisma';
import {customerSchema} from '@/lib/validations/customer';

export async function createCustomer(formData: FormData) {
  const parsed = customerSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address') || undefined
  });

  if (!parsed.success) {
    return {error: 'validation'};
  }

  await prisma.customer.create({data: parsed.data});
  revalidatePath('/ar/customers');
  revalidatePath('/fr/customers');
  return {success: true};
}

export async function updateCustomer(id: string, formData: FormData) {
  const parsed = customerSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address') || undefined
  });

  if (!parsed.success) {
    return {error: 'validation'};
  }

  await prisma.customer.update({where: {id}, data: parsed.data});
  revalidatePath('/ar/customers');
  revalidatePath('/fr/customers');
  return {success: true};
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({where: {id}});
  revalidatePath('/ar/customers');
  revalidatePath('/fr/customers');
  return {success: true};
}
