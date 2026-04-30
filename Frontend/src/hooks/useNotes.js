import { useState, useCallback, useEffect } from "react";
import FetchAllNotes from "../utils/API/notes/FetchAllNotes";

/**
 * @description Custom hook to manage notes data fetching and state for home page
 * @returns {Object} - Notes data and related functions
 * @property {Array} notes - Array of notes
 * @property {boolean} isLoading - Loading state
 * @property {boolean} isError - Error state
 * @property {boolean} isRateLimited - Rate limit state
 * @property {string} errorMessage - Error message
 * @property {string} errorCode - Error code
 * @property {Function} handleRetry - Function to retry fetching notes
 * @example
 * ```jsx
 * const { notes, isLoading, isError, isRateLimited, errorMessage, handleRetry } = useNotes();
 * ```
 */
export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({
    isError: false,
    isRateLimited: false,
    message: "",
    code: "",
  });

  const fetchNotes = useCallback(async (isInitial = false) => {
    if (isInitial) setIsLoading(true);
    const result = await FetchAllNotes();

    if (result.success) {
      setNotes(result.data);
      setError({ isError: false, isRateLimited: false, message: "", code: "" });
    } else {
      if (result.error.isRateLimited) {
        setError({
          isError: false,
          isRateLimited: result.error.isRateLimited,
          message: result.error.message,
          code: result.error.code,
        });
      } else {
        setError({
          isError: true,
          isRateLimited: result.error.isRateLimited,
          message: result.error.message,
          code: result.error.code,
        });
      }
    }
    setIsLoading(false);
  }, []);

  const handleRetry = useCallback(() => {
    setError((prev) => ({ ...prev, isError: false, isRateLimited: false }));
    setIsLoading(true);
    fetchNotes(true);
  }, [fetchNotes]);

  useEffect(() => {
    fetchNotes(true);
  }, [fetchNotes]);

  return {
    notes,
    isLoading,
    isError: error.isError,
    isRateLimited: error.isRateLimited,
    errorMessage: error.message,
    errorCode: error.code,
    handleRetry,
  };
};
