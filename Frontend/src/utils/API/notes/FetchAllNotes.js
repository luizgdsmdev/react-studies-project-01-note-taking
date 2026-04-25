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
 * @returns {Promise<Array>} - Promise that resolves to an array of notes
 */
const FetchAllNotes = async (
  setIsLoading,
  setNotes,
  setIsRateLimited,
  setErrorMessage,
  setErrorCode,
  setIsError,
) => {
  setIsLoading(true);
  try {
    const response = await axios.get("http://localhost:5001/api/v1/notes");

    setNotes(response.data);
    setIsRateLimited(false);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      setIsRateLimited(true);
    } else {
      setErrorMessage(error.message);
      setErrorCode(error.code);
      setIsError(true);
      console.error(error);
    }
  } finally {
    setIsLoading(false);
  }
};

export default FetchAllNotes;
