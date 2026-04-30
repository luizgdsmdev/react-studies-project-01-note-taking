// hooks/useNotes.js
import { useQuery } from "@tanstack/react-query";
import FetchAllNotes from "../utils/API/notes/FetchAllNotes";

/**
 * @description Custom hook to manage notes data fetching with React Query caching
 * @returns {Object} - Notes data and related functions
 * @property {Array} notes - Array of notes
 * @property {boolean} isLoading - Loading state
 * @property {boolean} isError - Error state
 * @property {boolean} isRateLimited - Rate limit state
 * @property {string} errorMessage - Error message
 * @property {string} errorCode - Error code
 * @property {Function} handleRetry - Function to retry fetching notes
 */
export const useNotes = () => {
  const {
    data: notes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: FetchAllNotes,
    // Configurations inherited from QueryClient (main.jsx):
    // - staleTime: 3 minutes
    // - cacheTime: 10 minutes
    // - refetchOnWindowFocus: true
    // - refetchOnReconnect: true
    // - retry: 1
  });

  // Detect rate limit (status 429)
  const isRateLimited = error?.response?.status === 429;

  // Generic error (not rate limit)
  const isError = !!error && !isRateLimited;

  // Message and error code
  const errorMessage = error?.message || "";
  const errorCode = error?.code || "";

  // Retry manual (RateLimiting and ErrorMessage use this)
  const handleRetry = () => {
    refetch();
  };

  return {
    notes,
    isLoading,
    isError,
    isRateLimited,
    errorMessage,
    errorCode,
    handleRetry,
  };
};
