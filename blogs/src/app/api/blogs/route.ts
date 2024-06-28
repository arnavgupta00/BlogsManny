import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { sender, category, title, shortDescription, content, imageURL, URL, password , draft } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newBlog = await prisma.message.create({
      data: {
        sender,
        category,
        title,
        shortDescription,
        content,
        imageURL,
        URL,
        draft: draft ? draft : false,
        likes: 0 
      }
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { blogID, password, draft } = await req.json();
  const id = parseInt(blogID);
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedBlog = await prisma.message.update({
      where: { id },
      data: { draft: draft }
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

}

export async function DELETE(req: NextRequest) {
  const { blogID, password } = await req.json();
  const id = parseInt(blogID);
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deletedBlog = await prisma.message.delete({
      where: { id }
    });

    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
