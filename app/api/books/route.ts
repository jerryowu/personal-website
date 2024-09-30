import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const books = await prisma.book.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(books);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBook = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        status: body.status,
      },
    });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Error creating book" }, { status: 500 });
  }
}
