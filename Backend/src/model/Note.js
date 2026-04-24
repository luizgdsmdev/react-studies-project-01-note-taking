import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 1000,
    },
  },
  { timestamps: true }, // Inserts Created_at and Updated_at from default
);

/**
 * @description Note model for MongoDB with title and content validation
 * @param {Object} required noteData - Note data object with title and content
 * @param {string} required noteData.title - Note title, min 1 char, max 100 chars
 * @param {string} required noteData.content - Note content, min 0 chars, max 1000 chars
 * @param {Date} Auto-inserted noteData.createdAt - Auto inserts Created_at timestamp by Mongoose schema
 * @param {Date} Auto-inserted noteData.updatedAt - Auto inserts Updated_at timestamp by Mongoose schema
 * @example
 * ```javascript
 * const note = new Note({ title: "Note", content: "Content" });
 * await note.save();
 * ```
 * @type {Model}
 */
const Note = mongoose.model("Note", noteSchema);
export default Note;
