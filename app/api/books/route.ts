import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const books = await prisma.book.findMany({
      where: status ? { status } : undefined,
      orderBy: { order: "asc" },
    });

    if (!books || books.length === 0) {
      return NextResponse.json({ message: "No books found" }, { status: 200 });
    }

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newBook = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        status: body.status,
        isBanger: body.isBanger,
        order: body.order,
      },
    });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Error creating book" }, { status: 500 });
  }
}
