import { useNotes } from "../../hooks/useNotes";
import Header from "../../components/shared/Header";
import RateLimiting from "../../components/shared/RateLimiting";
import ErrorMessage from "../../components/shared/ErrorMessage";
import Loading from "../../components/shared/Loading";
import NoteCard from "./noteCard/NoteCard";
import MotionDiv from "../../components/animatedRoutes/MotionDiv";

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
      {notes.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-4 p-4">
          {notes.map((note, index) => (
            <NoteCard key={note._id} note={note} index={index} />
          ))}
        </div>
      )}
    </MotionDiv>
  );
}

export default Home;
