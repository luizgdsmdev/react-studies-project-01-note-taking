import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import NoteDetails from "./pages/noteDetails/NoteDetails";
import { Routes, Route } from "react-router-dom";

/**
 * @description Main App component that defines the routing for the application
 * @returns {JSX.Element} Main App component with routing
 */
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
}

export default App;
