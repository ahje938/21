import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SectionList = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get("https://localhost:7263/api/section");

                // Extract sections from $values if present
                const sectionArray = response.data.$values || response.data;

                setSections(sectionArray);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        };

        fetchSections();
    }, []);

    if (loading) {
        return <p>Loading sections...</p>;
    }

    if (!Array.isArray(sections) || sections.length === 0) {
        return <p>No sections available.</p>;
    }

    return (
        <div>
            <h2>Section</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.id}>
                        <Link to={`/section/${section.id}/questions`}>{section.sectionName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;
