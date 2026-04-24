/**
 * @description Get all notes related to current user
 * @returns status with {Object} - A JSON object with notes data
 * @param {Object} req - JSON request object
 * @param {Object} res - JSON response object
 * @method GET
 * @route /api/v1/notes
 * @example status 200 ok with
 * {
 *  "message": "Hello World!"
 * }
 */
export function getAllNotes(req, res) {
  return res.status(200).json({ message: "Hello World!" });
}
