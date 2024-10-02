"use client";
import { useState, useRef, useEffect } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { LoginForm } from "../components/LoginForm";
import Image from "next/image";
import bangerStamp from "/public/reading/banger.png";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const [editingBook, setEditingBook] = useState<number | null>(null);

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: () => fetch(`/api/books`).then((res) => res.json()),
  });

  const addBookMutation = useMutation<Book, Error, NewBook>({
    mutationFn: (newBook) =>
      fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setNewBook({
        title: "",
        author: "",
        status: activeTab,
        isBanger: false,
        order: 0,
      });
    },
  });

  const deleteBookMutation = useMutation<void, Error, number>({
    mutationFn: (bookId: number) =>
      fetch(`/api/books/${bookId}`, { method: "DELETE" }).then((res) =>
        res.json()
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  const editBookMutation = useMutation<Book, Error, Book>({
    mutationFn: (updatedBook: Book) =>
      fetch(`/api/books/${updatedBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setEditingBook(null);
    },
  });

  const toggleBangerMutation = useMutation<Book, Error, Book>({
    mutationFn: (updatedBook: Book) =>
      fetch(`/api/books/${updatedBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update book");
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error toggling banger status:", error);
    },
  });

  const reorderBooksMutation = useMutation<Book[], Error, Book[]>({
    mutationFn: (updatedBooks: Book[]) =>
      fetch(`/api/books/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBooks),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to reorder books");
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error reordering books:", error);
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        loginFormRef.current &&
        !loginFormRef.current.contains(event.target as Node)
      ) {
        setShowLoginForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const BookList = ({ title, books }: { title: string; books: Book[] }) => {
    const onDragEnd = (result: DropResult) => {
      if (!result.destination || !isLoggedIn) {
        return;
      }

      const items = Array.from(books);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      // Update the books with new indices
      const updatedBooks = items.map((book, index) => ({
        ...book,
        order: index,
      }));

      // Send the updated books to the server
      reorderBooksMutation.mutate(updatedBooks);
    };

    return (
      <div className="bg-gradient-to-br from-[#fbf1c7] to-[#f2e5bc] shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-[#b57614] text-center border-b-2 border-[#d79921] pb-2">
          {title}
        </h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="books">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-6"
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
                        className="bg-[#ebdbb2] p-4 rounded-md transition-all duration-300 hover:shadow-md hover:bg-[#d5c4a1] flex items-center"
                      >
                        {isLoggedIn && (
                          <div
                            {...provided.dragHandleProps}
                            className="mr-4 text-[#928374] cursor-move text-2xl font-bold opacity-50"
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
                            }}
                            className="flex-grow flex items-center space-x-2"
                          >
                            <input
                              name="title"
                              defaultValue={book.title}
                              className="flex-grow p-1 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
                            />
                            <input
                              name="author"
                              defaultValue={book.author}
                              className="flex-grow p-1 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
                            />
                            <button
                              type="submit"
                              className="px-2 py-1 bg-[#fabd2f] text-[#282828] rounded hover:bg-[#d79921] w-20 h-12 mr-2 flex items-center justify-center"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingBook(null)}
                              className="px-2 py-1 bg-[#cc241d] text-[#fbf1c7] rounded hover:bg-[#9d0006] w-20 h-12 flex items-center justify-center"
                            >
                              Cancel
                            </button>
                          </form>
                        ) : (
                          <>
                            <div className="flex items-center flex-grow">
                              <div>
                                <span className="font-semibold text-lg text-[#3c3836]">
                                  {book.title}
                                </span>
                                <p className="text-[#504945] mt-1 italic">
                                  by {book.author}
                                </p>
                              </div>
                              {book.isBanger && (
                                <Image
                                  src={bangerStamp}
                                  alt="Banger"
                                  width={60}
                                  height={60}
                                  className="ml-4"
                                />
                              )}
                            </div>
                            {isLoggedIn && (
                              <div className="flex items-center ml-4">
                                <button
                                  onClick={() => setEditingBook(book.id)}
                                  className="px-2 py-1 bg-[#fabd2f] text-[#282828] rounded hover:bg-[#d79921] w-20 h-12 mr-2 w-16 flex items-center justify-center"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    deleteBookMutation.mutate(book.id)
                                  }
                                  className="px-2 py-1 bg-[#cc241d] text-white rounded hover:bg-[#cc241d] mr-2 w-20 h-12 flex items-center justify-center"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    const updatedBook = {
                                      ...book,
                                      isBanger: !book.isBanger,
                                    };
                                    toggleBangerMutation.mutate(updatedBook);
                                  }}
                                  className={`px-2 py-1 rounded ${
                                    book.isBanger
                                      ? "bg-[#b16286] hover:bg-[#8f3f71]"
                                      : "bg-[#689d6a] hover:bg-[#427b58]"
                                  } text-white w-40 h-12 flex items-center justify-center`}
                                >
                                  <span className="whitespace-nowrap">
                                    {book.isBanger
                                      ? "Remove Banger"
                                      : "Mark as Banger"}
                                  </span>
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const categories = ["current", "finished", "readingList"] as const;
  const categoryTitles: Record<Book["status"], string> = {
    current: "Current",
    finished: "Finished",
    readingList: "Reading List",
  };

  return (
    <main className="flex flex-col items-center justify-start p-16 min-h-screen bg-gradient-to-b from-[#fbf1c7] to-[#f9f5d7]">
      <div className="absolute top-22 right-0 mt-2 mr-24">
        {!isLoggedIn ? (
          showLoginForm ? (
            <div ref={loginFormRef} className="relative z-50">
              <LoginForm
                onLogin={() => {
                  setIsLoggedIn(true);
                  setShowLoginForm(false);
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowLoginForm(true)}
              className="px-4 py-2 bg-[#b57614] text-white rounded hover:bg-[#af3a03]"
            >
              Login
            </button>
          )
        ) : (
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-[#cc241d] text-white rounded hover:bg-[#9d0006]"
          >
            Logout
          </button>
        )}
      </div>
      <div className="w-full max-w-4xl mb-12 flex flex-col items-center relative">
        <h1 className="text-5xl font-bold mb-12 text-[#9d0006] text-center animate-fade-in-down">
          My Reading Journey
        </h1>

        <div className="w-full max-w-4xl mb-8 flex justify-center relative">
          <div className="flex bg-[#ebdbb2] rounded-lg overflow-hidden w-full">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`flex-1 px-4 py-2 transition-all duration-300 ${
                  activeTab === category
                    ? "bg-[#b57614] text-white"
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
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b57614] text-center">
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
                  order: lowestOrder - 1, // Set the order to be one less than the current lowest order
                });
              }}
              className="flex flex-wrap gap-4"
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
                className="px-4 py-2 bg-[#98971a] text-white rounded hover:bg-[#79740e]"
              >
                Add Book
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl space-y-8 flex flex-col items-center animate-fade-in">
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
