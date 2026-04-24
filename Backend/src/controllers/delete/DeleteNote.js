import Note from "../../model/Note.js";

/**
 * @description Delete a note for current user
 * @param {Object} req - JSON request object
 * @param {Object} res - JSON response object
 * @method DELETE
 * @route /api/v1/notes/:id
 * @example status 200 ok with
 * {
 *    "title":"My note",
 *    "content":"My note content",
 *    "_id":"69eba1d22750111b7a0f5c1e",
 *    "createdAt":"2026-04-24T17:01:06.580Z",
 *    "updatedAt":"2026-04-24T17:01:06.580Z",
 *    "__v":0
 * }
 * @returns status with {Object} - A JSON object with note data or 404 with { message: "Something went wrong, please check your request or data provided" } if note not found
 */
export async function DeleteNote(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        message:
          "Something went wrong, please check your request or data provided",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting note at DeleteNote controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
