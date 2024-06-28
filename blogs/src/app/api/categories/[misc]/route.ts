import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest,{ params }: { params: { misc: string } }) {
  try {
    const { misc } = params;
    const categories = await prisma.message.findMany({
      select: {
        category: true
      },
      where: {
        draft: false
      },
      distinct: ['category']
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
