import React, { useState } from "react";
import axios from "axios";

const AnswerList = ({ answers, fetchAnswers }) => {
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7263/api/answers/${id}`);
      fetchAnswers(); // Refresh the answer list
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  // Handle edit
  const handleEdit = (answer) => {
    setEditingAnswer(answer.id);
    setNewAnswerText(answer.answerText);
    setIsCorrect(answer.correct);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://localhost:7263/api/answers/${id}`, {
        AnswerText: newAnswerText,
        Correct: isCorrect,
        QuestionId: answers[0].questionId, // Assuming all answers belong to the same question
      });
      setEditingAnswer(null); // Exit edit mode
      fetchAnswers(); // Refresh the list
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  // If answers are inside the $values property, extract them
  const answerArray = answers.$values || answers;

  if (!Array.isArray(answerArray) || answerArray.length === 0) {
    return <p>No answers available.</p>;
  }

  return (
    <div>
      <h3>Answers</h3>
      <ul>
        {answerArray.map((answer) => (
          <li key={answer.id}>
            {editingAnswer === answer.id ? (
              <>
                <input
                  type="text"
                  value={newAnswerText}
                  onChange={(e) => setNewAnswerText(e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={isCorrect}
                  onChange={(e) => setIsCorrect(e.target.checked)}
                />
                <button onClick={() => handleUpdate(answer.id)}>Save</button>
                <button onClick={() => setEditingAnswer(null)}>Cancel</button>
              </>
            ) : (
              <>
                {answer.answerText} - {answer.correct ? "Correct" : "Incorrect"}
                <button onClick={() => handleEdit(answer)}>Edit</button>
                <button onClick={() => handleDelete(answer.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerList;
