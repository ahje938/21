import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddQuestions = () => {
    const [questionText, setQuestionText] = useState("");
    const { sectionId } = useParams();
    console.log(`Extracted sectionId: ${sectionId}`); // Log the sectionId

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!sectionId) {
            alert("Section ID is required.");
            console.log("sectionId is missing or undefined");
            return;
        }
    
        if (questionText === "") {
            alert("Question text is required");
            return;
        }
    
        // Log the payload being sent to the backend
        const payload = {
            QuestionText: questionText,
            SectionId: parseInt(sectionId) // Ensure SectionId is sent as an integer
        };
        console.log('Posting data:', JSON.stringify(payload, null, 2));
    
        try {
            const response = await axios.post(`https://localhost:7263/api/questions/${sectionId}`, payload);
            console.log('Question added:', response.data);
            alert("Question added successfully!");
            setQuestionText(""); // Clear input after successful addition
        } catch (error) {
            console.error("There was an error adding the question!", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Add Question to Section {sectionId}</h2>
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
        </div>
    );
};

export default AddQuestions;
