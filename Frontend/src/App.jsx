import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import NoteDetails from "./pages/noteDetails/NoteDetails";
import { Routes, Route } from "react-router-dom";

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
