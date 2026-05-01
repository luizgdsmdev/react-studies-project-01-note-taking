import toast from "react-hot-toast";

/**
 * @description Custom toast error message component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message
 * @returns {void}
 */
export default function ToastErrorMessage({ message }) {
  return toast.error(message, {
    style: {
      border: "1px solid var(--fallback-b3,oklch(var(--b3)/1))",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "1.2rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    duration: 4000,
    position: "top-center",
  });
}
