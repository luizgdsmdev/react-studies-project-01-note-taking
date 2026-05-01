import Header from "../../components/shared/Header";
import MotionDiv from "../../components/animatedRoutes/MotionDiv";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPointsEffect from "../../components/shared/LoadingPointsEffect";
import ToastErrorMessage from "../../components/shared/toastMessage/errorMessage/ToastErrorMessage";
import { useCreateNote } from "../../hooks/useCreateNote";
import RateLimiting from "../../components/shared/RateLimiting";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ToastSuccessMessage from "../../components/shared/toastMessage/successMessage/ToastSuccessMessage";
import handleCreateNote, {
  handleRedirectOnSuccess,
} from "../../utils/API/notes/handleCreateNote";

/**
 * @description Create page component for note creation and handling form submission
 * @returns {JSX.Element} Create page
 */
function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    note,
    isError,
    errorMessage,
    isRateLimited,
    errorCode,
    handleRetry,
    createNote,
  } = useCreateNote();

  const handleCreateNoteSubmit = (e) => {
    handleCreateNote({
      e,
      title,
      content,
      setIsLoading,
      createNote,
      isError,
      isRateLimited,
      ToastErrorMessage,
      ToastSuccessMessage,
    });
  };

  //Redirect to note created on success
  useEffect(() => {
    if (note && note._id && !isError && !isRateLimited) {
      handleRedirectOnSuccess({
        noteId: note._id,
        isError,
        isRateLimited,
        navigate,
      });
    }
  }, [note, isError, isRateLimited, navigate]);

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
      <div className="container w-full px-4 py-4 align-center justify-self-center">
        <div className="container max-w-2xl px-4 py-4 align-center">
          <Link
            to="/"
            className="btn btn-ghost scale-95 hover:scale-100 transition-all duration-500"
          >
            <ArrowLeft className="mr-2 hover:scale-110 transition-transform" />{" "}
            Back to Notes
          </Link>
        </div>
        <div className="card bg-base-100 shadow-xl max-w-8xl mx-auto">
          <div className="card-body p-1 pt-3 pb-3">
            <form onSubmit={handleCreateNoteSubmit}>
              <div className="form-control">
                <fieldset className="fieldset bg-base-200 rounded-box w-auto p-6">
                  <label className="label" htmlFor="title">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    maxLength={100}
                    minLength={1}
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="input w-full max-w-4.5"
                    placeholder="My note title"
                  />

                  <label className="label pt-6" htmlFor="Content">
                    Content
                  </label>
                  <textarea
                    id="Content"
                    maxLength={1000}
                    minLength={1}
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                    className="input w-full min-h-40 p-4"
                    placeholder="My note content"
                  />
                  <div className="card-actions justify-end md:justify-center lg:justify-center sm:justify-end pt-6">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? <LoadingPointsEffect /> : "Create Note"}
                    </button>
                  </div>
                </fieldset>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

export default Create;
