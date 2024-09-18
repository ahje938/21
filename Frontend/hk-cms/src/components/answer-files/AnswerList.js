import React, { useState } from "react";
import axios from "axios";
import "../../css/AnswerList.css";

const AnswerList = ({ answers, fetchAnswers }) => {
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7263/api/answers/${id}`);
      fetchAnswers();
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

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
        QuestionId: answers[0].questionId,
      });
      setEditingAnswer(null);
      fetchAnswers();
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const answerArray = answers.$values || answers;

  if (!Array.isArray(answerArray) || answerArray.length === 0) {
    return <p>No answers available.</p>;
  }

  return (
    <div className="answer-list-container">
      <h3>Answers</h3>
      <ul className="answer-list">
        {answerArray.map((answer) => (
          <li key={answer.id} className="answer-item">
            {editingAnswer === answer.id ? (
              <>
                <input
                  type="text"
                  value={newAnswerText}
                  onChange={(e) => setNewAnswerText(e.target.value)}
                  className="input-edit"
                />
                <input
                  type="checkbox"
                  checked={isCorrect}
                  onChange={(e) => setIsCorrect(e.target.checked)}
                  className="input-checkbox"
                />
                <button onClick={() => handleUpdate(answer.id)} className="btn-save">Save</button>
                <button onClick={() => setEditingAnswer(null)} className="btn-cancel">Cancel</button>
              </>
            ) : (
              <>
                {answer.answerText} - {answer.correct ? "Correct" : "Incorrect"}
                <button onClick={() => handleEdit(answer)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(answer.id)} className="btn-delete">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerList;
