import axios from "axios";

/**
 * @description
 * Creates a new note with the provided title and content.
 * @param {Object} params - Parameters for creating a note
 * @param {string} params.title - Title of the note
 * @param {string} params.content - Content of the note
 * @returns {Promise<Object>} - Returns the created note
 */
const CreateNote = async ({ title, content }) => {
  try {
    const response = await axios.post("http://localhost:5001/api/v1/notes", {
      title,
      content,
    });
    return response.data; // returns array of notes directly
  } catch (error) {
    // Throws the error for React Query to catch
    throw error;
  }
};

export default CreateNote;
