import { memo } from "react";

/**
 * @description Loading component that displays a loading spinner with multiple sizes during API calls and more
 * @returns {JSX.Element} Loading spinner with multiple sizes
 */
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );
};

export default memo(Loading);
