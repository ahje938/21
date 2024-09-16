import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SectionList = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get("https://localhost:7263/api/section");
                // Handle $values if needed
                const sectionArray = response.data.$values || response.data;
                setSections(sectionArray);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sections:", error);
                setLoading(false);
            }
        };

        fetchSections();
    }, []);

    // Handle delete section
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7263/api/section/${id}`);
            setSections(sections.filter(section => section.id !== id));
        } catch (error) {
            console.error("Error deleting section:", error);
        }
    };

    if (loading) {
        return <p>Loading sections...</p>;
    }

    if (!Array.isArray(sections) || sections.length === 0) {
        return <p>No sections available.</p>;
    }

    return (
        <div>
            <h2>Section List</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.id}>
                        <Link to={`/section/${section.id}/questions`}>{section.sectionName}</Link>
                        {/* Add links/buttons for edit and delete */}
                        <Link to={`/section/edit/${section.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(section.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;
