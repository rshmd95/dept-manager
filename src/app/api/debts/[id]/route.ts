import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {debtSchema} from '@/lib/validations/debt';
import {parseBody} from '@/lib/api/parse-body';

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const parsed = debtSchema.safeParse(await parseBody(request));
  if (!parsed.success) return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  return NextResponse.json(await prisma.debt.update({where: {id}, data: parsed.data}));
}

export async function DELETE(_: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  await prisma.debt.delete({where: {id}});
  return NextResponse.json({success: true});
}
