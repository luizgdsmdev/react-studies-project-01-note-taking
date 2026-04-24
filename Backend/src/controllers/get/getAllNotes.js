import Note from "../../model/Note.js";

/**
 * @description Get all notes related to current user
 * @param {Object} req - JSON request object
 * @param {Object} res - JSON response object
 * @method GET
 * @route /api/v1/notes
 * @example status 200 ok with
 * {
 *    "title":"My note",
 *    "content":"My note content",
 *    "_id":"69eba1d22750111b7a0f5c1e",
 *    "createdAt":"2026-04-24T17:01:06.580Z",
 *    "updatedAt":"2026-04-24T17:01:06.580Z",
 *    "__v":0
 * }
 * @returns status with {Object} - A JSON object with notes data
 */
export async function GetAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Retrieve all notes from the database, sorted by creation date (newest first)
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error getting all notes at GetAllNotes controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
