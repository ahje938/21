import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import AnswerList from "./AnswerList";
import { get, post } from "../../services/Api"; // Use the helper functions from Api.js
import "../../css/Answer.css";

const AddAnswers = () => {
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const { questionId } = useParams(); // Get questionId from the URL
  const [answers, setAnswers] = useState([]); // Store the list of answers

  // Fetch answers
  const fetchAnswers = useCallback(async () => {
    try {
      const response = await get(`/answers/question/${questionId}`);
      setAnswers(response.$values || response); // Set the fetched answers
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
      await post(`/answers/${questionId}`, {
        AnswerText: answerText,
        Correct: isCorrect,
        QuestionId: questionId,
      });

      setAnswerText(""); // Clear input
      setIsCorrect(false); // Reset checkbox
      fetchAnswers(); // Refresh the answer list after adding a new answer
    } catch (error) {
      console.error("There was an error adding the answer:", error);
    }
  };

  return (
    <div className="add-answer-container">
      <h2>Håndter svar til spørsmål</h2>

      <form onSubmit={handleSubmit} className="answer-form">
        <div className="form-group">
          <label>Svar tekst:</label>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Skriv inn svartekst"
            className="input-text"
            rows="4" // Adjust the number of rows as needed
          />
        </div>
        <div className="checkbox-container">
        <label>Korrekt svar</label>
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Legg til svar
        </button>
      </form>

      <AnswerList answers={answers} fetchAnswers={fetchAnswers} />
    </div>
  );
};

export default AddAnswers;
