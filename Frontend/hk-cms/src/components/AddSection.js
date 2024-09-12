// src/components/AddSection.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSection = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "") {
            alert("Section name is required");
            return;
        }

        try {
            const response = await axios.post("https://localhost:7263/api/section", { name });
            const sectionId = response.data.id;

            // Redirect to the questions page for the created section
            navigate(`/section/${sectionId}/questions`);
        } catch (error) {
            console.error("There was an error creating the section!", error);
        }
    };

    return (
        <div>
            <h2>Create a New Quiz (Section)</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Section Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter section name"
                    />
                </div>
                <button type="submit">Create Section</button>
            </form>
        </div>
    );
};

export default AddSection;
