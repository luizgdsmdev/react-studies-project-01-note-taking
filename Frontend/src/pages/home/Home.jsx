import { useNotes } from "../../hooks/useNotes";
import Header from "../../components/shared/Header";
import RateLimiting from "../../components/shared/RateLimiting";
import ErrorMessage from "../../components/shared/ErrorMessage";
import Loading from "../../components/shared/Loading";

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
    <div className="min-h-screen">
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
    </div>
  );
}

export default Home;
