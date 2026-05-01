import axios from "axios";

/**
 * @description
 * Fetches all notes from the API for the home page display.
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
