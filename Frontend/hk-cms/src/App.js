// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSection from "./components/AddSection";
import AddQuestions from "./components/AddQuestions";
import NavBar from "./components/NavBar";
import "./css/NavBar.css";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<AddSection />} />
          <Route path="/section/:sectionId/questions" element={<AddQuestions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
