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

export default function Reading() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReadingContent />
    </QueryClientProvider>
  );
}

function ReadingContent() {
  const [activeTab, setActiveTab] = useState<
    "currentlyReading" | "finished" | "readingList"
  >("currentlyReading");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    status: "readingList",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginFormRef = useRef<HTMLDivElement>(null);

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetch(`/api/books`).then((res) => res.json()),
  });

  const addBookMutation = useMutation({
    mutationFn: (newBook) =>
      fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setNewBook({ title: "", author: "", status: newBook.status });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (bookId: number) =>
      fetch(`/api/books/${bookId}`, { method: "DELETE" }).then((res) =>
        res.json()
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
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

  const BookList = ({
    title,
    books,
  }: {
    title: string;
    books: { id: number; title: string; author: string; status: string }[];
  }) => (
    <div className="bg-gradient-to-br from-[#fbf1c7] to-[#f2e5bc] shadow-lg rounded-lg p-6 mb-8 w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-[#b57614] text-center border-b-2 border-[#d79921] pb-2">
        {title}
      </h2>
      <ul className="space-y-6">
        {books.map((book) => (
          <li
            key={book.id}
            className="bg-[#ebdbb2] p-4 rounded-md transition-all duration-300 hover:shadow-md hover:bg-[#d5c4a1] flex items-center justify-between"
          >
            <div>
              <span className="font-semibold text-lg text-[#3c3836]">
                {book.title}
              </span>
              <p className="text-[#504945] mt-1 italic">by {book.author}</p>
            </div>
            {isLoggedIn && (
              <div>
                <button
                  onClick={() => deleteBookMutation.mutate(book.id)}
                  className="px-2 py-1 bg-[#fb4934] text-[#282828] rounded hover:bg-[#cc241d]"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const categories = ["currentlyReading", "finished", "readingList"] as const;
  const categoryTitles: Record<(typeof categories)[number], string> = {
    currentlyReading: "Currently Reading",
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
            <h2 className="text-2xl font-semibold mb-4 text-[#b57614]">
              Add New Book
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addBookMutation.mutate(newBook);
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
              <select
                value={newBook.status}
                onChange={(e) =>
                  setNewBook({ ...newBook, status: e.target.value })
                }
                className="p-2 rounded border border-[#d79921] bg-[#fbf1c7] text-[#3c3836] focus:outline-none focus:ring-2 focus:ring-[#d79921]"
              >
                <option value="readingList">Reading List</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="finished">Finished</option>
              </select>
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
            (book: { status: string }) => book.status === activeTab
          )}
        />
      </div>
    </main>
  );
}
