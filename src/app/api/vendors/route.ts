import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {vendorSchema} from '@/lib/validations/vendor';
import {parseBody} from '@/lib/api/parse-body';

export async function GET() {
  const data = await prisma.vendor.findMany({orderBy: {createdAt: 'desc'}});
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const parsed = vendorSchema.safeParse(await parseBody(request));
  if (!parsed.success) return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  return NextResponse.json(await prisma.vendor.create({data: parsed.data}), {status: 201});
}
