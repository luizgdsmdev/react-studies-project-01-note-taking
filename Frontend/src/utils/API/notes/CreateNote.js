import axiosInstance from "../../axios/axiosInstance";

/**
 * @description
 * Creates a new note with the provided title and content.
 * @param {Object} params - Parameters for creating a note
 * @param {string} params.title - Title of the note
 * @param {string} params.content - Content of the note
 * @returns {Promise<Object>} - Returns the created note
 */
const CreateNote = async ({ title, content }) => {
  const response = await axiosInstance.post("/notes", {
    title,
    content,
  });
  return response.data; // returns array of notes directly
};

export default CreateNote;
