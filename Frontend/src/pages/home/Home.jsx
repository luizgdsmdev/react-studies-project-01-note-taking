import { useNotes } from "../../hooks/useNotes";
import { useState } from "react";
import Header from "../../components/shared/Header";
import RateLimiting from "../../components/shared/RateLimiting";
import ErrorMessage from "../../components/shared/ErrorMessage";
import Loading from "../../components/shared/Loading";
import NoteCard from "./noteCard/NoteCard";
import MotionDiv from "../../components/animatedRoutes/MotionDiv";
import NoNotesMessage from "./noNotesMessage/NoNotesMessage";
import DeleteMessage from "../../components/shared/DeleteMessage";

/**
 * @description Home page component that displays notes and related UI elements
 * @returns {JSX.Element} Home page with notes and related UI elements
 */
function Home() {
  const {
    notes,
    isLoading,
    isError,
    errorMessage,
    isRateLimited,
    errorCode,
    handleRetry,
  } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleOpenModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  return (
    <MotionDiv>
      <Header />
      {isRateLimited && <RateLimiting onRetry={handleRetry} />}
      {isError && !isRateLimited && (
        <ErrorMessage
          message={errorMessage}
          code={errorCode}
          onRetry={handleRetry}
        />
      )}
      {isLoading && <Loading />}
      {notes.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-4 p-4">
          {notes.map((note, index) => (
            <NoteCard
              key={note._id}
              note={note}
              index={index}
              onDeleteClick={handleOpenModal}
            />
          ))}
        </div>
      ) : (
        <NoNotesMessage />
      )}

      <DeleteMessage
        noteId={selectedNote?._id}
        noteTitle={selectedNote?.title}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </MotionDiv>
  );
}

export default Home;
