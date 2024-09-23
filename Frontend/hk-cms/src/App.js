import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; 
import Sections from "./pages/Sections";
import AddQuestions from "./components/question-files/AddQuestions";
import AddAnswers from "./components/answer-files/AddAnswers";
import NavBar from "./components/NavBar";
import SectionQuestionAnswerList from "./components/SectionQuestionAnswerList";

const App = () => {
  return (
    <Router>
      {/* Keep the NavBar and SectionQuestionAnswerList on all routes except login */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={
          <>
            <NavBar />
            <div className="main-container">
              <SectionQuestionAnswerList />
              <Routes>
                <Route path="/sections" element={<Sections />} />
                <Route path="/section/:sectionId/questions" element={<AddQuestions />} />
                <Route path="/question/:questionId/answers" element={<AddAnswers />} />
              </Routes>
            </div>
          </>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
