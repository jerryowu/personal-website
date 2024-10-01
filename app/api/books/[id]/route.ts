import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  try {
    await prisma.book.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: `Book ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedBook = await prisma.book.update({
      where: { id: body.id },
      data: {
        title: body.title,
        author: body.author,
        status: body.status,
      },
    });
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Error updating book" }, { status: 500 });
  }
}
