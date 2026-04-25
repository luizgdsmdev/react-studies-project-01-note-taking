import Header from "../../components/shared/Header";
import RateLimiting from "../../components/shared/RateLimiting";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { useEffect, useState } from "react";
import FetchAllNotes from "../../utils/API/notes/FetchAllNotes";

function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const AllNotesResponse = async () => {
    const response = await FetchAllNotes(
      setIsLoading,
      setNotes,
      setIsRateLimited,
      setErrorMessage,
      setErrorCode,
      setIsError,
    );
    return response;
  };

  const handleRetry = () => {
    setIsRateLimited(false);
    setIsError(false);
    AllNotesResponse();
  };

  useEffect(() => {
    (async () => {
      await AllNotesResponse();
    })();
  }, []);
  console.log(notes);
  return (
    <div className="min-h-screen">
      <Header />
      {isRateLimited && <RateLimiting onRetry={handleRetry} />}
      {isError && (
        <ErrorMessage
          message={errorMessage}
          code={errorCode}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}

export default Home;
