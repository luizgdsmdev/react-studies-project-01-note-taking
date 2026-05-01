// hooks/useCreateNote.js
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import CreateNote from "../utils/API/notes/CreateNote";

/**
 * @description Custom hook to manage note creation with React Query
 * @returns {Object} - Note creation data and related functions
 * @property {Object} note - Created note object
 * @property {boolean} isLoading - Loading state
 * @property {boolean} isError - Error state
 * @property {boolean} isRateLimited - Rate limit state
 * @property {string} errorMessage - Error message
 * @property {string} errorCode - Error code
 * @property {Function} handleRetry - Function to retry creating note
 * @property {Function} createNote - Function to create note
 */
export const useCreateNote = () => {
  const [lastNoteData, setLastNoteData] = useState(null);

  const {
    data: note = {},
    isLoading,
    error,
    mutate: createNoteMutation,
    reset,
  } = useMutation({
    mutationFn: ({ title, content }) => CreateNote({ title, content }),
    retry: 1,
  });

  // Wrapper for createNote to store the data for retry
  const createNote = (noteData) => {
    setLastNoteData(noteData);
    createNoteMutation(noteData);
  };

  // Detect rate limit (status 429)
  const isRateLimited = error?.response?.status === 429;

  // Generic error (not rate limit)
  const isError = !!error && !isRateLimited;

  // Message and error code
  const errorMessage = error?.message || "";
  const errorCode = error?.code || "";

  // Retry manual
  const handleRetry = () => {
    reset();
    if (lastNoteData) {
      createNoteMutation(lastNoteData);
    }
  };

  return {
    note,
    isLoading,
    isError,
    isRateLimited,
    errorMessage,
    errorCode,
    handleRetry,
    createNote,
  };
};
