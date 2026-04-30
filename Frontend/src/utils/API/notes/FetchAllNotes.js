import axios from "axios";

/**
 * @description
 * Fetches all notes from the API for the home page display.
 * Controls the loading state, rate limit state, error state, and sets the notes state.
 * @param {Function} setIsLoading - Function to set the loading state
 * @param {Function} setNotes - Function to set the notes state
 * @param {Function} setIsRateLimited - Function to set the rate limit state
 * @param {Function} setErrorMessage - Function to set the error message state
 * @param {Function} setErrorCode - Function to set the error code state
 * @param {Function} setIsError - Function to set the error state
 * @path Request to http://localhost:5001/api/v1/notes
 * @returns {Promise<Array>} - Returns an array of notes
 */
const FetchAllNotes = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/v1/notes");
    return response.data; // returns array of notes directly
  } catch (error) {
    // Throws the error for React Query to catch
    throw error;
  }
};

export default FetchAllNotes;
