import React from "react";

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
          <li key={question.id}>{question.questionText}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
