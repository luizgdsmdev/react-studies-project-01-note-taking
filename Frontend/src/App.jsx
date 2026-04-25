import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import NoteDetails from "./pages/noteDetails/NoteDetails";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <button
        className="btn btn-outline"
        onClick={() => {
          const currentTheme =
            document.documentElement.getAttribute("data-theme");
          const newTheme = currentTheme === "forest" ? "light" : "forest";
          document.documentElement.setAttribute("data-theme", newTheme);
        }}
      >
        Toggle Theme
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
}

export default App;
