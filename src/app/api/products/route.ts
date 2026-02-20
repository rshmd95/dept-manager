import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {productSchema} from '@/lib/validations/product';
import {parseBody} from '@/lib/api/parse-body';

export async function GET() {
  return NextResponse.json(
    await prisma.product.findMany({
      include: {vendor: true, category: true},
      orderBy: {createdAt: 'desc'}
    })
  );
}

export async function POST(request: NextRequest) {
  const parsed = productSchema.safeParse(await parseBody(request));
  if (!parsed.success) return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  return NextResponse.json(await prisma.product.create({data: parsed.data}), {status: 201});
}
