import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const blog = await prisma.message.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.message.update({
      where: { id: parseInt(id) },
      data: { views: blog.views + 1 },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest , { params }: { params: { id: string } }
) {

  const { id } = params;

  const {  user, content } = await req.json();
  try {
    const blog = await prisma.message.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const comment = await prisma.comment.create({
      data: {
        user,
        content,
        messageId: parseInt(id),
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
