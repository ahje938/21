import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuestionList = ({ questions, fetchQuestions }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");

  // If questions are inside the $values property, extract them
  const questionArray = questions.$values || questions;

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7263/api/questions/${id}`);
      fetchQuestions(); // Refresh the list
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Handle edit
  const handleEdit = (question) => {
    setEditingQuestion(question.id);
    setNewQuestionText(question.questionText);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://localhost:7263/api/questions/${id}`, {
        QuestionText: newQuestionText,
        SectionId: questionArray.length > 0 ? questionArray[0].sectionId : null, // Ensure sectionId is available
      });
      setEditingQuestion(null); // Exit edit mode
      fetchQuestions(); // Refresh the list
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  if (!Array.isArray(questionArray) || questionArray.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div>
      <h3>Questions</h3>
      <ul>
        {questionArray.map((question) => (
          <li key={question.id}>
            {editingQuestion === question.id ? (
              <>
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                />
                <button onClick={() => handleUpdate(question.id)}>Save</button>
                <button onClick={() => setEditingQuestion(null)}>Cancel</button>
              </>
            ) : (
              <>
                <Link to={`/question/${question.id}/answers`}>
                  {question.questionText}
                </Link>
                <button onClick={() => handleEdit(question)}>Edit</button>
                <button onClick={() => handleDelete(question.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;

