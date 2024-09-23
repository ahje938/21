import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/Question.css";

const QuestionList = ({ questions, fetchQuestions }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");

  const questionArray = questions.$values || questions;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7263/api/questions/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question.id);
    setNewQuestionText(question.questionText);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://localhost:7263/api/questions/${id}`, {
        QuestionText: newQuestionText,
        SectionId: questionArray[0].sectionId,
      });
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleUpdate(id);
    }
  };

  if (!Array.isArray(questionArray) || questionArray.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div className="question-list-container">
      <h3>Spørsmål</h3>
      <ul className="question-list">
        {questionArray.map((question) => (
          <li key={question.id} className="question-list-item">
            {editingQuestion === question.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(question.id); }}>
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="input-edit"
                  onKeyDown={(e) => handleKeyDown(e, question.id)}
                />
                <button type="submit" className="btn-save">Lagre</button>
                <button type="button" onClick={() => setEditingQuestion(null)} className="btn-cancel">Kansellere</button>
              </form>
            ) : (
              <div>
                <Link
                  to={`/question/${question.id}/answers`}
                  state={{ fromSectionId: question.sectionId }}
                  className="question-link"
                >
                  {question.questionText}
                </Link>
                <button onClick={() => handleEdit(question)} className="btn-edit">Oppdater</button>
                <button onClick={() => handleDelete(question.id)} className="btn-delete">Slett</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
