// // import React, { useState, useEffect, useCallback } from "react";
// // import { get, post } from "../../services/Api"; // Import get and post methods from Api.js
// // import { useParams } from "react-router-dom";
// // import QuestionList from "./QuestionList";
// // import "../../css/Question.css";

// // const AddQuestions = () => {
// //   const [questionText, setQuestionText] = useState("");
// //   const { sectionId } = useParams(); // Get sectionId from the URL
// //   const [questions, setQuestions] = useState([]); // Store the list of questions

// //   // Fetch questions
// //   const fetchQuestions = useCallback(async () => {
// //     try {
// //       const response = await get(`/questions/section/${sectionId}`); // Use get helper
// //       setQuestions(response.data); // Set the fetched questions
// //     } catch (error) {
// //       console.error("Error fetching questions:", error);
// //     }
// //   }, [sectionId]); // Recreate the function only when sectionId changes

// //   useEffect(() => {
// //     fetchQuestions(); // Fetch questions when the sectionId changes
// //   }, [fetchQuestions]); // Now fetchQuestions is a stable dependency

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!sectionId) {
// //       alert("Section ID is required.");
// //       return;
// //     }

// //     if (questionText === "") {
// //       alert("Question text is required.");
// //       return;
// //     }

// //     try {
// //       await post(`/questions/${sectionId}`, {
// //         QuestionText: questionText,
// //         SectionId: parseInt(sectionId),
// //       }); // Use post helper

// //       setQuestionText(""); // Clear input
// //       fetchQuestions(); // Refresh the question list after adding a new question
// //     } catch (error) {
// //       console.error("There was an error adding the question:", error.response ? error.response.data : error.message);
// //     }
// //   };

// //   return (
// //     <div className="add-question-container">
// //       <h2>Håndter spørsmål til Modul</h2>

// //       <form onSubmit={handleSubmit} className="question-form">
// //         <div className="form-group">
// //           <label>Spørsmålstekst : </label>
// //           <textarea
// //             value={questionText}
// //             onChange={(e) => setQuestionText(e.target.value)}
// //             placeholder="Skriv inn spørsmålstekst"
// //             className="input-text"
// //             rows="4" // Adjust the number of rows as needed
// //           />
// //         </div>
// //         <button type="submit" className="submit-btn">Legg til spørsmål</button>
// //       </form>

// //       <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
// //     </div>
// //   );
// // };

// // export default AddQuestions;
// import React, { useState, useEffect, useCallback } from "react";
// import { get, post } from "../../services/Api"; // Import get and post methods from Api.js
// import { useParams } from "react-router-dom";
// import QuestionList from "./QuestionList";
// import "../../css/Question.css";

// const AddQuestions = () => {
//   const [questionText, setQuestionText] = useState("");
//   const { sectionId } = useParams(); // Get sectionId from the URL
//   const [questions, setQuestions] = useState([]); // Store the list of questions

//   // Fetch questions
//   const fetchQuestions = useCallback(async () => {
//     try {
//       console.log("Fetching questions for sectionId:", sectionId); // Log the sectionId being fetched
//       const response = await get(`/questions/section/${sectionId}`); // Use get helper
//       console.log("Questions fetched:", response.data); // Log the fetched questions
//       setQuestions(response.data.$values || response.data); // Ensure correct data structure
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   }, [sectionId]); // Recreate the function only when sectionId changes

//   useEffect(() => {
//     fetchQuestions(); // Fetch questions when the sectionId changes
//   }, [fetchQuestions]); // Now fetchQuestions is a stable dependency

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!sectionId) {
//       alert("Section ID is required.");
//       return;
//     }

//     if (questionText === "") {
//       alert("Question text is required.");
//       return;
//     }

//     try {
//       await post(`/questions/${sectionId}`, {
//         QuestionText: questionText,
//         SectionId: parseInt(sectionId),
//       }); // Use post helper

//       setQuestionText(""); // Clear input
//       fetchQuestions(); // Refresh the question list after adding a new question
//     } catch (error) {
//       console.error("There was an error adding the question:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="add-question-container">
//       <h2>Håndter spørsmål til Modul</h2>

//       <form onSubmit={handleSubmit} className="question-form">
//         <div className="form-group">
//           <label>Spørsmålstekst : </label>
//           <textarea
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             placeholder="Skriv inn spørsmålstekst"
//             className="input-text"
//             rows="4" // Adjust the number of rows as needed
//           />
//         </div>
//         <button type="submit" className="submit-btn">Legg til spørsmål</button>
//       </form>

//       <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
//     </div>
//   );
// };

// export default AddQuestions;
import React, { useState, useEffect, useCallback } from "react";
import { get, post } from "../../services/Api"; // Import get and post methods from Api.js
import { useParams } from "react-router-dom";
import QuestionList from "./QuestionList";
import "../../css/Question.css";

const AddQuestions = () => {
  const [questionText, setQuestionText] = useState("");
  const { sectionId } = useParams(); // Get sectionId from the URL
  const [questions, setQuestions] = useState([]); // Store the list of questions

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    try {
      console.log("Fetching questions for sectionId:", sectionId);
      const response = await get(`/questions/section/${sectionId}`); // Use get helper
      console.log("Response from API:", response); // Log the response for debugging

      // Assuming questions are nested within the response structure
      setQuestions(response.questions || response.$values || []); // Adjust based on actual structure
    } catch (error) {
      console.error("Error fetching questions:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  }, [sectionId]); // Recreate the function only when sectionId changes

  useEffect(() => {
    fetchQuestions(); // Fetch questions when the sectionId changes
  }, [fetchQuestions]); // Now fetchQuestions is a stable dependency

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sectionId) {
      alert("Section ID is required.");
      return;
    }

    if (questionText === "") {
      alert("Question text is required.");
      return;
    }

    try {
      await post(`/questions/${sectionId}`, {
        QuestionText: questionText,
        SectionId: parseInt(sectionId),
      }); // Use post helper

      setQuestionText(""); // Clear input
      fetchQuestions(); // Refresh the question list after adding a new question
    } catch (error) {
      console.error("There was an error adding the question:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="add-question-container">
      <h2>Håndter spørsmål til Modul</h2>

      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label>Spørsmålstekst : </label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Skriv inn spørsmålstekst"
            className="input-text"
            rows="4" // Adjust the number of rows as needed
          />
        </div>
        <button type="submit" className="submit-btn">Legg til spørsmål</button>
      </form>

      <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
    </div>
  );
};

export default AddQuestions;
