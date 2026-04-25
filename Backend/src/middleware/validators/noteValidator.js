import { body, param, validationResult } from "express-validator";

// Middleware to capture errors (avoids repeating the 'if' in the controller)
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Something went wrong", errors: errors.array() });
  }
  next();
};

export const validateEmptyRequest = [
  // Ensure the request body is completely empty
  body().custom((_, { req }) => {
    if (Object.keys(req.body).length > 0) {
      throw new Error("This request must not contain a body.");
    }
    return true;
  }),
  handleValidationErrors,
];

// Validation only for routes that receive ID in the URL
export const validateId = [
  param("id")
    .notEmpty()
    .withMessage("ID field cannot be empty")
    .isMongoId()
    .withMessage(
      "Invalid ID. Check for the correct format - it should follow the ObjectId pattern.",
    ),
  handleValidationErrors,
];

// Validation for the complete note body (Create/Update)
export const validateNoteBody = [
  // Title: optional, but if sent, must follow the rules
  body("title")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title field")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  // Content: optional, but if sent, must follow the rules
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content field")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content must be between 1 and 1000 characters"),

  // CRITICAL RULE: Ensures at least one of the two exists
  body().custom((_, { req }) => {
    const title = req.body.title;
    const content = req.body.content;

    // Check if both are "falsy" (undefined, null or empty string after trim)
    const isTitleEmpty = !title || title.trim().length === 0;
    const isContentEmpty = !content || content.trim().length === 0;

    if (isTitleEmpty && isContentEmpty) {
      throw new Error(
        'You must send at least one valid field: "title" or "content".',
      );
    }
    return true;
  }),

  // Security against extra fields (keeping your previous logic)
  body().custom((_, { req }) => {
    const allowedFields = ["title", "content"];
    const keys = Object.keys(req.body);
    const unknownFields = keys.filter((key) => !allowedFields.includes(key));
    if (unknownFields.length > 0) {
      throw new Error(`Fields not allowed: ${unknownFields.join(", ")}`);
    }
    return true;
  }),

  handleValidationErrors,
];
