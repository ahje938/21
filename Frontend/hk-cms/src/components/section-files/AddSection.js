import React, { useState } from "react";
import { post } from "../../services/Api"; // Adjust the import according to your project structure
import "../../css/Section.css";

const AddSection = ({ triggerFetch }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === "") {
            setError("Section name is required.");
            return;
        }

        try {
            await post("/section", { name }); // Use the correct endpoint
            setName(""); // Clear the input field
            triggerFetch(); // Call the function to refresh the section list
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

