import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import SinglePage from "./components/SinglePage";
import Search from "./components/Search";

function App() {
  const [isLeftContainerOpen, setIsLeftContainerOpen] = useState(true);

  const toggleLeftContainer = () => {
    setIsLeftContainerOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <HashRouter>
        <Navbar onMenuClick={toggleLeftContainer} />

        <Routes>
          <Route
            path="/"
            element={<Home isLeftContainerOpen={isLeftContainerOpen} />}
          />

          <Route path="/video/:videoId" element={<SinglePage />} />
          <Route
            path="/search/:query"
            element={<Search isLeftContainerOpen={isLeftContainerOpen} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
