import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  const [isLeftContainerOpen, setIsLeftContainerOpen] = useState(true);

  const toggleLeftContainer = () => {
    setIsLeftContainerOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar onMenuClick={toggleLeftContainer} />
      <Home isLeftContainerOpen={isLeftContainerOpen} />
    </>
  );
}

export default App;
