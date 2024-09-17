import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AnswerList from "./AnswerList";

const AddAnswers = () => {
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const { questionId } = useParams(); // Get questionId from the URL
  const [showAnswerList, setShowAnswerList] = useState(false); // Toggle for answer list visibility
  const [answers, setAnswers] = useState([]); // Store the list of answers

  // Use useCallback to memoize the fetchAnswers function
  const fetchAnswers = useCallback(async () => {
    try {
      const response = await axios.get(`https://localhost:7263/api/answers/question/${questionId}`);
      setAnswers(response.data.$values || response.data); // Set the fetched answers
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  }, [questionId]);

  useEffect(() => {
    fetchAnswers(); // Fetch answers when the questionId changes
  }, [fetchAnswers]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionId) {
      alert("Question ID is required.");
      return;
    }

    if (answerText === "") {
      alert("Answer text is required.");
      return;
    }

    try {
        await axios.post(`https://localhost:7263/api/answers/${questionId}`, {
            AnswerText: answerText,
            Correct: isCorrect,
            QuestionId: questionId
          });
          

      setAnswerText(""); // Clear input
      setIsCorrect(false); // Reset checkbox
      fetchAnswers(); // Refresh the answer list after adding a new answer
    } catch (error) {
      console.error("There was an error adding the answer:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Manage Answers for Question {questionId}</h2>

      {/* Form to add a new answer */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Answer Text:</label>
          <input
            type="text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Enter answer text"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isCorrect}
              onChange={(e) => setIsCorrect(e.target.checked)}
            />
            Is Correct
          </label>
        </div>
        <button type="submit">Add Answer</button>
      </form>

      {/* Button to toggle answer list visibility */}
      <button onClick={() => setShowAnswerList(!showAnswerList)}>
        {showAnswerList ? "Hide Answers" : "Show Answers"}
      </button>

      {/* Conditionally render the answer list */}
      {showAnswerList && <AnswerList answers={answers} fetchAnswers={fetchAnswers} />}
    </div>
  );
};

export default AddAnswers;
