import React, { useState } from "react";
import { del, put } from "../../services/Api"; // Import delete and put methods from Api.js
import "../../css/Answer.css";

const AnswerList = ({ answers, fetchAnswers }) => {
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDelete = async (id) => {
    try {
      await del(`/answers/${id}`); // Use the delete helper function
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
      await put(`/answers/${id}`, {
        AnswerText: newAnswerText,
        Correct: isCorrect,
        QuestionId: answers[0].questionId, // Assuming answers always have at least one item
      });
      setEditingAnswer(null);
      fetchAnswers();
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleUpdate(id);
    }
  };

  const answerArray = answers.$values || answers;

  if (!Array.isArray(answerArray) || answerArray.length === 0) {
    return <p>No answers available.</p>;
  }

  return (
    <div className="answer-list-container">
      <h3>Svar</h3>
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
                  onKeyDown={(e) => handleKeyDown(e, answer.id)}
                />
                <input
                  type="checkbox"
                  checked={isCorrect}
                  onChange={(e) => setIsCorrect(e.target.checked)}
                  className="input-checkbox"
                />
                <button onClick={() => handleUpdate(answer.id)} className="btn-save">
                  Lagre
                </button>
                <button onClick={() => setEditingAnswer(null)} className="btn-cancel">
                  Kansellere
                </button>
              </>
            ) : (
              <>
                {answer.answerText} - {answer.correct ? "Correct" : "Incorrect"}
                <button onClick={() => handleEdit(answer)} className="btn-edit">
                  Oppdater
                </button>
                <button onClick={() => handleDelete(answer.id)} className="btn-delete">
                  Slett
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerList;
