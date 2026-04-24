import Note from "../../model/Note.js";

/**
 * @description Create a new note for current user
 * @param {Object} req - JSON request object
 * @param {Object} res - JSON response object
 * @method POST
 * @route /api/v1/notes
 * @example status 201 created with
 * {
 *    "title":"My note",
 *    "content":"My note content",
 *    "_id":"69eba1d22750111b7a0f5c1e",
 *    "createdAt":"2026-04-24T17:01:06.580Z",
 *    "updatedAt":"2026-04-24T17:01:06.580Z",
 *    "__v":0
 * }
 * @returns status with {Object} - A JSON object with note data or 500 with { message: "Internal server error", error: error.message } if note not found
 */
export async function CreateNote(req, res) {
  try {
    const { title, content } = req.body;
    //Since title and content are the same property names, we can use shorthand instead of title: title, content: content
    const note = new Note({ title, content });

    await note.save(); //Save the note to the database

    return res.status(201).json(note); //Return the created note
  } catch (error) {
    console.error("Error creating note at CreateNote controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
