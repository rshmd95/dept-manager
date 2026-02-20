import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {customerSchema} from '@/lib/validations/customer';
import {parseBody} from '@/lib/api/parse-body';

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const body = await parseBody(request);
  const parsed = customerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  }

  const customer = await prisma.customer.update({where: {id}, data: parsed.data});
  return NextResponse.json(customer);
}

export async function DELETE(_: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  await prisma.customer.delete({where: {id}});
  return NextResponse.json({success: true});
}
