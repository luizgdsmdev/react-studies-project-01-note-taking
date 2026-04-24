import express from "express";
import { getAllNotes } from "../controllers/get/getAllNotes.js";

/**
 * @description Router for server endpoints across all routes on notes
 * @path /api/v1/notes
 * @example router.get("/api/v1/notes", getAllNotes);
 */
const NOTES_ROUTER = express.Router();

NOTES_ROUTER.get("/api/v1/notes", getAllNotes);

export default NOTES_ROUTER;
