import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists/:listId" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
