import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../../pages/home/Home";
import Create from "../../pages/create/Create";
import NoteDetails from "../../pages/noteDetails/NoteDetails";
import { AnimatePresence } from "framer-motion";

/**
 * @description Animated routes component controller, holds all routes and handles animations
 * @returns {JSX.Element} Animated routes
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Add class to hide scrollbars on body
    document.body.style.overflow = "hidden";
    document.body.style.scrollbarWidth = "none";
    document.body.style.msOverflowStyle = "none";
    document.documentElement.style.overflow = "hidden";

    // Timeout to ensure scrollbars stay hidden during transition
    const timeout = setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
      document.body.style.msOverflowStyle = "";
      document.documentElement.style.overflow = "";
    }, 800); // Timeout a little longer than transition duration

    return () => {
      clearTimeout(timeout);
      // Clear styles when component unmounts
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
      document.body.style.msOverflowStyle = "";
      document.documentElement.style.overflow = "";
    };
  }, [location.pathname]); // Execute whenever pathname changes

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
