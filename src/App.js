import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import PickMask from "./PickMask";
import PickFace from "./PickFace";
import PickVoice from "./PickVoice";
import Ready from "./Ready";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-mask" element={<PickMask />} />
        <Route path="/select-face" element={<PickFace />} />
        <Route path="/select-voice" element={<PickVoice />} />
        <Route path="/ready" element={<Ready />} />
      </Routes>
    </Router>
  );
};

export default App;
