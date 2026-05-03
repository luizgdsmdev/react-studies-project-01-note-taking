import { Trash2Icon } from "lucide-react";

const DeleteButton = ({ noteId, noteTitle, onDeleteClick }) => {
  return (
    <>
      <button
        onClick={() => onDeleteClick({ _id: noteId, title: noteTitle })}
        className="tooltip tooltip-sm tooltip-sm tooltip-left btn btn-ghost btn-xs text-error hover:bg-error/10 hover:scale-125 transition-all duration-300 flex items-center justify-center"
        data-tip="Delete"
      >
        <Trash2Icon className="size-4" aria-label="Delete note" />
      </button>
    </>
  );
};

export default DeleteButton;
