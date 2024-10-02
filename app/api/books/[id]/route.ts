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
    const books = await request.json();

    if (Array.isArray(books)) {
      const updatedBooks = await prisma.$transaction(
        books.map((book) =>
          prisma.book.update({
            where: { id: book.id },
            data: {
              order: book.order,
            },
          })
        )
      );
      return NextResponse.json(updatedBooks, { status: 200 });
    } else {
      const { id, ...updateData } = books;
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id, 10) },
        data: updateData,
      });
      return NextResponse.json(updatedBook, { status: 200 });
    }
  } catch (error) {
    console.error("Error reordering books:", error);
    return NextResponse.json(
      { error: "Error reordering books" },
      { status: 500 }
    );
  }
}
