import { useEffect, useState } from "react";

export function useBooksData(query) {
  const baseUrl = "https://reactnd-books-api.udacity.com";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setError] = useState(null);

  async function loadAllBooks() {
    try {
      const response = await fetch(`${baseUrl}/books`, {
        headers: {'Authorization': 'Bearer Token'}
      });

      if (!response?.ok) {
        setError(`Failed to retrieve books with status code: ${response.status}`);
      }

      const jsonResponse = await response.json();
      setBooks(jsonResponse.books);
    } catch (error) {
      console.error(error);
      setError("Error loading books");
    } finally {
      setLoading(false);
    }
  }

  async function searchBooks() {
  }

  useEffect(() => {
    if (!query) {
      loadAllBooks();
    } else {
      searchBooks();
    }
  }, [query])

  return {
    apiError,
    books,
    loading
  };
}