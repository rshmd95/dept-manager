import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {customerSchema} from '@/lib/validations/customer';
import {parseBody} from '@/lib/api/parse-body';

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      debts: {
        select: {amount: true, status: true}
      }
    },
    orderBy: {createdAt: 'desc'}
  });

  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  const parsed = customerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  }

  const customer = await prisma.customer.create({data: parsed.data});
  return NextResponse.json(customer, {status: 201});
}
