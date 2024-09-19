import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionList from "./QuestionList";
import "../../css/Question.css";

const AddQuestions = () => {
  const [questionText, setQuestionText] = useState("");
  const { sectionId } = useParams(); // Get sectionId from the URL
  const [questions, setQuestions] = useState([]); // Store the list of questions

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get(`https://localhost:7263/api/questions/section/${sectionId}`);
      setQuestions(response.data); // Set the fetched questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [sectionId]); // Recreate the function only when sectionId changes

  useEffect(() => {
    fetchQuestions(); // Fetch questions when the sectionId changes
  }, [fetchQuestions]); // Now fetchQuestions is a stable dependency

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sectionId) {
      alert("Section ID is required.");
      return;
    }

    if (questionText === "") {
      alert("Question text is required.");
      return;
    }

    try {
      await axios.post(`https://localhost:7263/api/questions/${sectionId}`, {
        QuestionText: questionText,
        SectionId: parseInt(sectionId)
      });

      setQuestionText(""); // Clear input
      fetchQuestions(); // Refresh the question list after adding a new question
    } catch (error) {
      console.error("There was an error adding the question:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="add-question-container">
    <h2>Manage Questions for Section {sectionId}</h2>

    <form onSubmit={handleSubmit} className="question-form">
      <div className="form-group">
        <label>Question Text:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter question text"
          className="input-text"
        />
      </div>
      <button type="submit" className="submit-btn">Add Question</button>
    </form>

    <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
  </div>
  );
};

export default AddQuestions;
