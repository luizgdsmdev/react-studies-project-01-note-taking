import express from "express";
import { GetAllNotes } from "../controllers/get/GetAllNotes.js";
import { CreateNote } from "../controllers/post/CreateNote.js";
import { UpdateNote } from "../controllers/put/UpdateNote.js";
import { DeleteNote } from "../controllers/delete/DeleteNote.js";
import { GetSingleNote } from "../controllers/get/GetSingleNote.js";
import {
  validateId,
  validateNoteBody,
  validateEmptyRequest,
} from "../middleware/validators/noteValidator.js";

/**
 * @description Router for server endpoints across all routes on notes
 * @path /api/v1/notes
 * @example router.get("/api/v1/notes", GetAllNotes);
 */
const NOTES_ROUTER = express.Router();

NOTES_ROUTER.get("/api/v1/notes", validateEmptyRequest, GetAllNotes);
NOTES_ROUTER.get(
  "/api/v1/noteId/:id",
  validateId,
  validateEmptyRequest,
  GetSingleNote,
);
NOTES_ROUTER.post("/api/v1/notes", validateNoteBody, CreateNote);
NOTES_ROUTER.put("/api/v1/notes/:id", validateId, validateNoteBody, UpdateNote);
NOTES_ROUTER.delete(
  "/api/v1/notes/:id",
  validateId,
  validateEmptyRequest,
  DeleteNote,
);

// Handle 404 for /api/v1/notes routes (e.g., PUT/DELETE without ID)
NOTES_ROUTER.all(
  ["/api/v1/notes", "/api/v1/notes/", "/api/v1/noteId", "/api/v1/noteId/"],
  (req, res) => {
    if (
      req.method === "PUT" ||
      req.method === "DELETE" ||
      req.method === "PATCH" ||
      req.method === "GET"
    ) {
      return res.status(400).json({
        message: "Something went wrong, ID is required for this operation.",
      });
    }
    res.status(404).json({ message: "Route not found" });
  },
);

// Catch-all 404 handler for this router
NOTES_ROUTER.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default NOTES_ROUTER;
