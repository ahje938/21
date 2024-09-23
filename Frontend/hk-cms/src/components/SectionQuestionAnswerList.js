import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../css/SideBar.css";

const SectionQuestionAnswerList = () => {
  const [sections, setSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    // Fetch sections from the API with details
    fetch("https://localhost:7263/api/section/WithDetails")
      .then((res) => res.json())
      .then((data) => {
        const sectionsData = data.$values || data;
        setSections(sectionsData);
      })
      .catch((error) => console.error("Error fetching sections:", error));
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const extractValues = (data) => {
    return data?.$values || data;
  };

  return (
    <div className="side-panel">
      <h3>Moduler</h3>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              to={`/section/${section.id}/questions`}
              onClick={() => toggleSection(section.id)}
            >
              {section.sectionName}
            </Link>
            {expandedSections[section.id] && (
              <ul>
                {extractValues(section.questions).map((question) => (
                  <li key={question.id}>
                    <Link
                      to={`/question/${question.id}/answers`}
                      onClick={() => toggleQuestion(question.id)}
                    >
                      {question.questionText}
                    </Link>
                    {expandedQuestions[question.id] && (
                      <ul>
                        {extractValues(question.answers).map((answer) => (
                          <li key={answer.id}>
                            {answer.answerText}{" "}
                            {answer.isCorrect && (
                              <span className="correct-answer">✔</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionQuestionAnswerList;

