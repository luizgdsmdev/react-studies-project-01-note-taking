import Note from "../../model/Note.js";

/**
 * @description Get a single note related to current user
 * @param {Object} req - JSON request object
 * @param {Object} res - JSON response object
 * @method GET
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
 * @returns status with {Object} - A JSON object with notes data or 500 with { message: "Internal server error", error: error.message } if note not found
 */
export async function GetSingleNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    return res.status(200).json(note);
  } catch (error) {
    console.error(
      "Error getting single note at GetSingleNote controller:",
      error,
    );
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
