import { BadgeInfo, PersonStanding } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * @description
 * Rate limiting component popup that shows when the user has exceeded the rate limit, asking for a break during a few seconds
 * @param {Function} props.onRetry - Callback function to retry the request when countdown reaches 0
 * @returns {JSX.Element}
 */
const RateLimiting = ({ onRetry }) => {
  const [counter, setCounter] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRetry?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRetry]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center p-4 gap-6">
            <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full">
              <BadgeInfo className="size-7 text-primary animate-pulse" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">
                Requests limiting reached
              </h3>
              <p className="text-base-content mb-2 inline-flex items-center gap-2">
                Wow, you can really dance!{" "}
                <PersonStanding className="size-5 hidden md:inline" />
              </p>
              <p className="text-sm text-base-content/70">
                We're gonna try again automatically in{" "}
                <span className="countdown">
                  <span
                    style={{ "--value": counter }}
                    aria-live="polite"
                    aria-label={counter}
                  >
                    {counter}
                  </span>
                </span>{" "}
                seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimiting;
