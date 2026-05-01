/**
 * @description Handle create note form submission
 * @param {Object} params - Parameters object
 * @param {Event} params.e - Form submit event
 * @param {string} params.title - Note title
 * @param {string} params.content - Note content
 * @param {Function} params.setIsLoading - Set loading state function
 * @param {Function} params.createNote - Create note function
 * @param {boolean} params.isError - Error state
 * @param {boolean} params.isRateLimited - Rate limit state
 * @param {Function} params.ToastErrorMessage - Error toast message function
 * @param {Function} params.ToastSuccessMessage - Success toast message function
 * @returns {void}
 */
export default function handleCreateNote({
  e,
  title,
  content,
  setIsLoading,
  createNote,
  isError,
  isRateLimited,
  ToastErrorMessage,
  ToastSuccessMessage,
}) {
  e.preventDefault();
  if (
    !title.trim() ||
    !content.trim() ||
    title.length > 100 ||
    content.length > 1000 ||
    title.length < 1 ||
    content.length < 1
  ) {
    ToastErrorMessage({ message: "Please, fill in all fields" });
    return;
  }

  setIsLoading(true);
  createNote({
    title: title.trim(),
    content: content.trim(),
  });

  if (isError || isRateLimited) {
    setIsLoading(true);
    return;
  }

  ToastSuccessMessage({
    message: "Note created successfully, we're redirecting you...",
  });
}

/**
 * @description Handle redirect on success
 * @param {Object} params - Parameters object
 * @param {string} params.noteId - Note ID
 * @param {boolean} params.isError - Error state
 * @param {boolean} params.isRateLimited - Rate limit state
 * @param {Function} params.navigate - Navigate function
 * @returns {void}
 */
export function handleRedirectOnSuccess({
  noteId,
  isError,
  isRateLimited,
  navigate,
}) {
  if (noteId && !isError && !isRateLimited) {
    setTimeout(() => {
      navigate(`/note/${noteId}`);
    }, 1500); // Delay to show success message
  }
}
