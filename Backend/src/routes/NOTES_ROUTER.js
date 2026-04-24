import express from "express";
import { GetAllNotes } from "../controllers/get/GetAllNotes.js";
import { CreateNote } from "../controllers/post/CreateNote.js";
import { UpdateNote } from "../controllers/put/UpdateNote.js";
import { DeleteNote } from "../controllers/delete/DeleteNote.js";

/**
 * @description Router for server endpoints across all routes on notes
 * @path /api/v1/notes
 * @example router.get("/api/v1/notes", GetAllNotes);
 */
const NOTES_ROUTER = express.Router();

NOTES_ROUTER.get("/api/v1/notes", GetAllNotes);
NOTES_ROUTER.post("/api/v1/notes", CreateNote);
NOTES_ROUTER.put("/api/v1/notes/:id", UpdateNote);
NOTES_ROUTER.delete("/api/v1/notes/:id", DeleteNote);

export default NOTES_ROUTER;
