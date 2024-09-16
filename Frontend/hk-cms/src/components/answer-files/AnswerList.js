import React from "react";

const AnswerList = ({ answers }) => {
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
            {answer.answerText} - {answer.correct ? "Correct" : "Incorrect"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerList;
