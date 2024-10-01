"use client";
import { useState, useRef, useEffect } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { LoginForm } from "../components/LoginForm";

const queryClient = new QueryClient();

type Book = {
  id: number;
  title: string;
  author: string;
  status: "current" | "finished" | "readingList";
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
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const [editingBook, setEditingBook] = useState<number | null>(null);

  const {
    data: books,
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
      setNewBook({ title: "", author: "", status: activeTab });
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

  const BookList = ({ title, books }: { title: string; books: Book[] }) => (
    <div className="bg-gradient-to-br from-[#fbf1c7] to-[#f2e5bc] shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-[#b57614] text-center border-b-2 border-[#d79921] pb-2">
        {title}
      </h2>
      <ul className="space-y-6">
        {books.map((book) => (
          <li
            key={book.id}
            className="bg-[#ebdbb2] p-4 rounded-md transition-all duration-300 hover:shadow-md hover:bg-[#d5c4a1] flex items-center justify-between"
          >
            {editingBook === book.id ? (
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  editBookMutation.mutate({
                    id: book.id,
                    title: (
                      form.elements.namedItem("title") as HTMLInputElement
                    ).value,
                    author: (
                      form.elements.namedItem("author") as HTMLInputElement
                    ).value,
                    status: book.status,
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
                  className="px-2 py-1 bg-[#98971a] text-white rounded hover:bg-[#79740e]"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBook(null)}
                  className="px-2 py-1 bg-[#d79921] text-white rounded hover:bg-[#b57614]"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div>
                  <span className="font-semibold text-lg text-[#3c3836]">
                    {book.title}
                  </span>
                  <p className="text-[#504945] mt-1 italic">by {book.author}</p>
                </div>
                {isLoggedIn && (
                  <div>
                    <button
                      onClick={() => setEditingBook(book.id)}
                      className="px-2 py-1 bg-[#d79921] text-white rounded hover:bg-[#b57614] mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBookMutation.mutate(book.id)}
                      className="px-2 py-1 bg-[#fb4934] text-[#282828] rounded hover:bg-[#cc241d]"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

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
            <div ref={loginFormRef}>
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

        <div className="w-full max-w-4xl mb-8 flex justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mx-2 rounded-full transition-all duration-300 ${
                activeTab === category
                  ? "bg-[#b57614] text-white"
                  : "bg-[#ebdbb2] text-[#3c3836] hover:bg-[#d5c4a1]"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {categoryTitles[category]}
            </button>
          ))}
        </div>

        {isLoggedIn && (
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#b57614] text-center">
              Add New Book to {categoryTitles[activeTab]}
            </h2>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                addBookMutation.mutate({ ...newBook, status: activeTab });
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
          books={(books || []).filter(
            (book: Book) => book.status === activeTab
          )}
        />
      </div>
    </main>
  );
}
