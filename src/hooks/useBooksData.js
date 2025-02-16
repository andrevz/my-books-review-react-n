import { useEffect, useState } from "react";

export function useBooksData() {
  const baseUrl = "https://reactnd-books-api.udacity.com";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setError] = useState(null);

  async function loadAllBooks() {
    setLoading(true);
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

  async function searchBooks(query) {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/search`, {
        headers: {
          'Authorization': 'Bearer Token',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ query, maxResults: 20 })
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

  return {
    apiError,
    books,
    loading,
    loadAllBooks,
    searchBooks
  };
}