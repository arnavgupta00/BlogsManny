import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest,{ params }: { params: { category: string } }) {
  const { category } = params;

  try {
    const blogs = category === 'All'
      ? await prisma.message.findMany({
          orderBy: { timestamp: 'desc' },
          take: 20
        })
      : await prisma.message.findMany({
          where: { category },
          orderBy: { timestamp: 'desc' }
        });

    if (!blogs || blogs.length === 0) {
      return NextResponse.json({ error: 'No blogs found' }, { status: 404 });
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("err");
    console.log("Server faced an error while fetching blogs: ", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
