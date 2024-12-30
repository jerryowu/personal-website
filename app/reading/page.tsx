"use client";
import { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Image from "next/image";
import bangerStamp from "/public/reading/banger.png";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useBookMutations } from "../api/books/useBookMutations";
import { MoonLoader } from "react-spinners";
import { useLogin } from "../loginContext";

const queryClient = new QueryClient();

type Book = {
  id: number;
  title: string;
  author: string;
  status: "current" | "finished" | "readingList";
  isBanger: boolean;
  order: number;
};

type NewBook = Omit<Book, "id">;

export default function Reading() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReadingContent />
    </QueryClientProvider>
  );
}

function ReadingContent() {
  const [activeTab, setActiveTab] = useState<Book["status"]>("current");
  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    author: "",
    status: "readingList",
    isBanger: false,
    order: 0,
  });
  const [editingBook, setEditingBook] = useState<number | null>(null);
  const { isLoggedIn } = useLogin();

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: () => fetch(`/api/books`).then((res) => res.json()),
  });

  const {
    addBookMutation,
    editBookMutation,
    deleteBookMutation,
    toggleBangerMutation,
    reorderBooksMutation,
  } = useBookMutations();

  const BookList = ({ title, books }: { title: string; books: Book[] }) => {
    const onDragEnd = (result: DropResult) => {
      if (!result.destination || !isLoggedIn) {
        return;
      }

      const items = Array.from(books);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      const updatedBooks = items.map((book, index) => ({
        ...book,
        order: index,
      }));

      reorderBooksMutation.mutate(updatedBooks);
    };

    return (
      <div className="bg-gradient-to-br from-[#fbf1c7] to-[#f2e5bc] shadow-lg rounded-lg p-4 md:p-6 mb-8 w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#b57614] text-center border-b-2 border-[#d79921] pb-2">
          {title}
        </h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="books">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4 md:space-y-6"
              >
                {books.map((book, index) => (
                  <Draggable
                    key={book.id}
                    draggableId={book.id.toString()}
                    index={index}
                    isDragDisabled={!isLoggedIn}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-[#ebdbb2] p-3 md:p-4 rounded-md transition-all duration-300 hover:shadow-md hover:bg-[#d5c4a1] flex flex-col md:flex-row items-start md:items-center"
                      >
                        {isLoggedIn && (
                          <div
                            {...provided.dragHandleProps}
                            className="mb-2 md:mb-0 md:mr-4 text-[#928374] cursor-move text-2xl font-bold opacity-50"
                          >
                            ≡
                          </div>
                        )}
                        {editingBook === book.id ? (
                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                              e.preventDefault();
                              const form = e.currentTarget;
                              editBookMutation.mutate({
                                ...book,
                                title: (
                                  form.elements.namedItem(
                                    "title"
                                  ) as HTMLInputElement
                                ).value,
                                author: (
                                  form.elements.namedItem(
                                    "author"
                                  ) as HTMLInputElement
                                ).value,
                              });
                              setEditingBook(null);
                            }}
                            className="flex-grow flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full"
                          >
                            <input
                              name="title"
                              defaultValue={book.title}
                              className="w-full md:w-auto flex-grow p-1 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
                            />
                            <input
                              name="author"
                              defaultValue={book.author}
                              className="w-full md:w-auto flex-grow p-1 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
                            />
                            <div className="flex space-x-2 w-full md:w-auto">
                              <button
                                type="submit"
                                className="flex-1 md:flex-none px-2 py-1 bg-[#fabd2f] text-[#3c3836] rounded hover:bg-[#d79921] h-10 md:h-12 md:w-20 flex items-center justify-center"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingBook(null)}
                                className="flex-1 md:flex-none px-2 py-1 bg-[#cc241d] text-[#fbf1c7] rounded hover:bg-[#9d0006] h-10 md:h-12 md:w-20 flex items-center justify-center"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="flex flex-col md:flex-row items-start md:items-center flex-grow w-full">
                              <div className="mb-2 md:mb-0">
                                <span className="font-semibold text-base md:text-lg text-[#3c3836] block md:inline">
                                  {book.title}
                                </span>
                                <p className="text-[#504945] mt-1 italic text-sm md:text-base">
                                  by {book.author}
                                </p>
                              </div>
                              {book.isBanger && (
                                <Image
                                  src={bangerStamp}
                                  alt="Banger"
                                  width={40}
                                  height={40}
                                  className="ml-0 md:ml-4 mt-2 md:mt-0"
                                />
                              )}
                            </div>
                            {isLoggedIn && (
                              <div className="flex flex-wrap md:flex-nowrap gap-2 mt-3 md:mt-0 md:ml-4 w-full md:w-auto">
                                <button
                                  onClick={() => setEditingBook(book.id)}
                                  className="flex-1 md:flex-none px-2 py-1 bg-[#fabd2f] text-[#3c3836] rounded hover:bg-[#d79921] h-10 md:h-12 md:w-16 flex items-center justify-center text-sm md:text-base"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    const updatedBook = {
                                      ...book,
                                      isBanger: !book.isBanger,
                                    };
                                    toggleBangerMutation.mutate(updatedBook);
                                  }}
                                  className={`flex-1 md:flex-none px-2 py-1 rounded ${
                                    book.isBanger
                                      ? "bg-[#b16286] hover:bg-[#8f3f71]"
                                      : "bg-[#689d6a] hover:bg-[#427b58]"
                                  } text-[#fbf1c7] h-10 md:h-12 md:w-40 flex items-center justify-center text-sm md:text-base`}
                                >
                                  <span className="whitespace-nowrap">
                                    {book.isBanger
                                      ? "Remove Banger"
                                      : "Mark as Banger"}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    deleteBookMutation.mutate(book.id)
                                  }
                                  className="flex-1 md:flex-none px-2 py-1 bg-[#cc241d] text-[#fbf1c7] rounded hover:bg-[#cc241d] h-10 md:h-12 md:w-20 flex items-center justify-center text-sm md:text-base"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <MoonLoader
          color={"#8b9467"}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  const categories = ["current", "finished", "readingList"] as const;
  const categoryTitles: Record<Book["status"], string> = {
    current: "Current",
    finished: "Finished",
    readingList: "Reading List",
  };

  return (
    <main className="flex flex-col items-center justify-start p-4 md:p-16 min-h-screen bg-gradient-to-b from-[#fbf1c7] to-[#f9f5d7]">
      <div className="w-full max-w-4xl mb-8 md:mb-12 flex flex-col items-center relative">
        <h1 className="text-3xl md:text-5xl font-bold text-[#9d0006] text-center animate-fade-in-down mb-8 md:mb-16">
          My Reading Journey
        </h1>

        <div className="w-full max-w-4xl mb-6 md:mb-8 flex justify-center relative">
          <div className="flex bg-[#ebdbb2] rounded-lg overflow-hidden w-full">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`flex-1 px-2 md:px-4 py-2 transition-all duration-300 text-sm md:text-base ${
                  activeTab === category
                    ? "bg-[#b57614] text-[#fbf1c7]"
                    : "bg-[#ebdbb2] text-[#3c3836] hover:bg-[#d5c4a1]"
                } ${index !== 0 ? "border-l border-[#d79921]" : ""}`}
                onClick={() => setActiveTab(category)}
              >
                <span className="relative z-10">
                  {categoryTitles[category]}
                </span>
              </button>
            ))}
          </div>
          <div
            className="absolute bottom-0 left-0 h-full bg-[#b57614] transition-all duration-300"
            style={{
              width: `${100 / categories.length}%`,
              transform: `translateX(${categories.indexOf(activeTab) * 100}%)`,
            }}
          ></div>
        </div>

        {isLoggedIn && (
          <div className="w-full max-w-4xl mb-6 md:mb-8 px-4 md:px-0">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[#b57614] text-center">
              Add New Book to {categoryTitles[activeTab]}
            </h2>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const booksArray = Array.isArray(books) ? books : [];
                const booksInActiveTab = booksArray.filter(
                  (book) => book.status === activeTab
                );
                const lowestOrder =
                  booksInActiveTab.length > 0
                    ? Math.min(...booksInActiveTab.map((book) => book.order))
                    : 0;
                addBookMutation.mutate({
                  ...newBook,
                  status: activeTab,
                  order: lowestOrder - 1,
                });
              }}
              className="flex flex-col md:flex-row gap-3 md:gap-4"
            >
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                className="flex-grow p-2 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] placeholder-[#7c6f64] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                className="flex-grow p-2 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] placeholder-[#7c6f64] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#98971a] text-[#fbf1c7] rounded hover:bg-[#79740e] text-sm md:text-base"
              >
                Add Book
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="w-full max-w-4xl space-y-6 md:space-y-8 flex flex-col items-center animate-fade-in px-4 md:px-0">
        <BookList
          title={categoryTitles[activeTab]}
          books={
            Array.isArray(books)
              ? books
                  .filter((book: Book) => book.status === activeTab)
                  .sort((a: Book, b: Book) => a.order - b.order)
              : []
          }
        />
      </div>
    </main>
  );
}
