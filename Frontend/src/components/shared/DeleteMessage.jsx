import { BadgeInfo } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteMessage = ({ onRetry, noteId, noteTitle, isOpen, onClose }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    // Add delete logic here
    onClose();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // Add cancel logic here
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-box bg-base-100 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 bg-error/20 p-3 rounded-full">
                <BadgeInfo className="size-6 text-error animate-pulse" />
              </div>
              <h3 className="font-bold text-lg">Please confirm</h3>
            </div>
            <p className="py-4 pb-1">
              You are about to delete Note{" "}
              <span className="font-bold">{noteTitle}</span>
            </p>
            <p>Are you sure?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="btn btn-md btn-ghost transition-all duration-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-md btn-ghost text-white hover:bg-error/50 transition-all duration-300"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteMessage;
