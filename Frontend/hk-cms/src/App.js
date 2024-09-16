// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSection from "./components/AddSection";
import AddQuestions from "./components/AddQuestions";
import NavBar from "./components/NavBar";
import "./css/NavBar.css";
import SectionList from "./components/SectionList";
import AddAnswers from "./components/AddAnswer";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <AddSection />
                <SectionList />
              </div>
            }
          />
          <Route path="/section/:sectionId/questions" element={<AddQuestions />} />
          <Route path="/question/:questionId/answers" element={<AddAnswers />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
