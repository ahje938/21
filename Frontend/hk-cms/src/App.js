// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSection from "./components/AddSection";
import AddQuestions from "./components/AddQuestions";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Add route for adding a section */}
          <Route path="/" element={<AddSection />} />

          {/* Add questions without navigating away */}
          <Route path="/section/:sectionId/questions" element={<AddQuestions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
