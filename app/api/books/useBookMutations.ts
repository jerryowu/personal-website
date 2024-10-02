import { useMutation, useQueryClient } from "@tanstack/react-query";

type Book = {
  id: number;
  title: string;
  author: string;
  status: "current" | "finished" | "readingList";
  isBanger: boolean;
  order: number;
};

export function useBookMutations() {
  const queryClient = useQueryClient();

  const addBookMutation = useMutation({
    mutationFn: (newBook: Omit<Book, "id">) =>
      fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const editBookMutation = useMutation({
    mutationFn: (updatedBook: Book) =>
      fetch(`/api/books/${updatedBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/books/${id}`, { method: "DELETE" }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const toggleBangerMutation = useMutation({
    mutationFn: (updatedBook: Book) =>
      fetch(`/api/books/${updatedBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const reorderBooksMutation = useMutation({
    mutationFn: (updatedBooks: Book[]) =>
      fetch("/api/books/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBooks),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return {
    addBookMutation,
    editBookMutation,
    deleteBookMutation,
    toggleBangerMutation,
    reorderBooksMutation,
  };
}
