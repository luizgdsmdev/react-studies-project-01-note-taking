import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../../../utils/dateFormating/noteCardDateFormatting";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="max-w-full w-full sm:w-full md:max-w-80 lg:max-w-96"
    >
      <div className="card max-w-full w-full sm:w-full md:max-w-80 lg:max-w-96 bg-base-100 hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-t-4 border-primary">
        <div className="card-body p-6 pt-5">
          <h2 className="card-title text-base-content">{note.title}</h2>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </div>
        <div className="card-actions justify-between items-center p-4">
          <span className="text-sm text-base-content/70">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="tooltip tooltip-sm tooltip-sm tooltip-top btn btn-ghost btn-xs hover:bg-primary/30 hover:scale-125 transition-all duration-300 flex items-center justify-center"
              data-tip="Edit note"
            >
              <PenSquareIcon className="size-4" aria-label="Edit note" />
            </button>
            <button
              className="tooltip tooltip-sm tooltip-sm tooltip-left btn btn-ghost btn-xs text-error hover:bg-error/10 hover:scale-125 transition-all duration-300 flex items-center justify-center"
              data-tip="Delete note"
            >
              <Trash2Icon className="size-4" aria-label="Delete note" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
