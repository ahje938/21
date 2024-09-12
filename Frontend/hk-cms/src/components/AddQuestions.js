// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const AddQuestions = () => {
//     const [questionText, setQuestionText] = useState("");
//     const { sectionId } = useParams();
//     console.log(`Extracted sectionId: ${sectionId}`); // Log the sectionId

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!sectionId) {
//             alert("Section ID is required.");
//             console.log("sectionId is missing or undefined");
//             return;
//         }
    
//         if (questionText === "") {
//             alert("Question text is required");
//             return;
//         }
    
//         // Log the payload being sent to the backend
//         const payload = {
//             QuestionText: questionText,
//             SectionId: parseInt(sectionId) // Ensure SectionId is sent as an integer
//         };
//         console.log('Posting data:', JSON.stringify(payload, null, 2));
    
//         try {
//             const response = await axios.post(`https://localhost:7263/api/questions/${sectionId}`, payload);
//             console.log('Question added:', response.data);
//             alert("Question added successfully!");
//             setQuestionText(""); // Clear input after successful addition
//         } catch (error) {
//             console.error("There was an error adding the question!", error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Add Question to Section {sectionId}</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Question Text:</label>
//                     <input
//                         type="text"
//                         value={questionText}
//                         onChange={(e) => setQuestionText(e.target.value)}
//                         placeholder="Enter question text"
//                     />
//                 </div>
//                 <button type="submit">Add Question</button>
//             </form>
//         </div>
//     );
// };

// export default AddQuestions;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionList from "./QuestionList";

const AddQuestions = () => {
  const [questionText, setQuestionText] = useState("");
  const { sectionId } = useParams(); // Get sectionId from the URL
  const [showQuestionList, setShowQuestionList] = useState(false); // Toggle for question list visibility
  const [questions, setQuestions] = useState([]); // Store the list of questions

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`https://localhost:7263/api/questions/section/${sectionId}`);
      setQuestions(response.data); // Set the fetched questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions when the sectionId changes
  }, [sectionId]);

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
      await axios.post(`https://localhost:7263/api/questions/${sectionId}`, {
        QuestionText: questionText,
        SectionId: parseInt(sectionId)
      });

      alert("Question added successfully!");
      setQuestionText(""); // Clear input
      fetchQuestions(); // Refresh the question list
    } catch (error) {
      console.error("There was an error adding the question:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Manage Questions for Section {sectionId}</h2>

      {/* Form to add a new question */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text:</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter question text"
          />
        </div>
        <button type="submit">Add Question</button>
      </form>

      {/* Button to toggle question list visibility */}
      <button onClick={() => setShowQuestionList(!showQuestionList)}>
        {showQuestionList ? "Hide Questions" : "Show Questions"}
      </button>

      {/* Conditionally render the question list */}
      {showQuestionList && <QuestionList questions={questions} />}
    </div>
  );
};

export default AddQuestions;
