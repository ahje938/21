import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Section.css";

const AddSection = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === "") {
            setError("Section name is required.");
            return;
        }

        try {
            const response = await axios.post("https://localhost:7263/api/section", { name });
            const sectionId = response.data.id;
            navigate(`/section/${sectionId}/questions`); // Redirect to the questions page
        } catch (error) {
            setError("Error creating section.");
            console.error("There was an error creating the section!", error);
        }
    };

    return (
        <div className="add-section-container">
            <h2>Lag en ny modul</h2>
            <form onSubmit={handleSubmit} className="section-form">
                <div>
                    <label>Modul tittel : </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Skriv in tittel på modul"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Lag modul</button>
            </form>
        </div>
    );
};

export default AddSection;
