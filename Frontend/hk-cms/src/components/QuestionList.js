import React from "react";
import { Link } from "react-router-dom";

const QuestionList = ({ questions }) => {
  // If questions are inside the $values property, extract them
  const questionArray = questions.$values || questions;

  if (!Array.isArray(questionArray) || questionArray.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div>
      <h3>Questions</h3>
      <ul>
        {questionArray.map((question) => (
          <li key={question.id}>
            <Link to={`/question/${question.id}/answers`}>{question.questionText}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
