import axiosInstance from "../../axios/axiosInstance";

/**
 * @description
 * Fetches all notes from the API for the home page display.
 * @path Request to http://localhost:5001/api/v1/notes
 * @returns {Promise<Array>} - Returns an array of notes
 */
const FetchAllNotes = async () => {
  const response = await axiosInstance.get("/notes");
  return response.data;
};

export default FetchAllNotes;
