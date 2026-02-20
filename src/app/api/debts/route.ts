import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {debtSchema} from '@/lib/validations/debt';
import {parseBody} from '@/lib/api/parse-body';

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status');
  const search = request.nextUrl.searchParams.get('search');

  const debts = await prisma.debt.findMany({
    where: {
      ...(status ? {status: status as never} : {}),
      ...(search
        ? {
            customer: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            }
          }
        : {})
    },
    include: {customer: true},
    orderBy: {debtDate: 'desc'}
  });

  return NextResponse.json(debts);
}

export async function POST(request: NextRequest) {
  const parsed = debtSchema.safeParse(await parseBody(request));
  if (!parsed.success) return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  return NextResponse.json(await prisma.debt.create({data: parsed.data}), {status: 201});
}
