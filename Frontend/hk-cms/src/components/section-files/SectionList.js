// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const SectionList = () => {
//     const [sections, setSections] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSections = async () => {
//             try {
//                 const response = await axios.get("https://localhost:7263/api/section");
//                 // Handle $values if needed
//                 const sectionArray = response.data.$values || response.data;
//                 setSections(sectionArray);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching sections:", error);
//                 setLoading(false);
//             }
//         };

//         fetchSections();
//     }, []);

//     // Handle delete section
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`https://localhost:7263/api/section/${id}`);
//             setSections(sections.filter(section => section.id !== id));
//         } catch (error) {
//             console.error("Error deleting section:", error);
//         }
//     };

//     if (loading) {
//         return <p>Loading sections...</p>;
//     }

//     if (!Array.isArray(sections) || sections.length === 0) {
//         return <p>No sections available.</p>;
//     }

//     return (
//         <div>
//             <h2>Section List</h2>
//             <ul>
//                 {sections.map((section) => (
//                     <li key={section.id}>
//                         <Link to={`/section/${section.id}/questions`}>{section.sectionName}</Link>
//                         {/* Add links/buttons for edit and delete */}
//                         <Link to={`/section/edit/${section.id}`}>Edit</Link>
//                         <button onClick={() => handleDelete(section.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SectionList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SectionList = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSectionId, setEditingSectionId] = useState(null); // Track the section being edited
    const [editedSectionName, setEditedSectionName] = useState(""); // Track the new section name

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get("https://localhost:7263/api/section");
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

    // Start editing a section
    const handleEditClick = (section) => {
        setEditingSectionId(section.id);
        setEditedSectionName(section.sectionName); // Set the initial name to the current one
    };

    // Handle updating the section name
    const handleSaveEdit = async (id) => {
        try {
            // Send "Name" field to match backend expectations
            await axios.put(`https://localhost:7263/api/section/${id}`, { Name: editedSectionName });
            setSections(sections.map(section =>
                section.id === id ? { ...section, sectionName: editedSectionName } : section
            ));
            setEditingSectionId(null); // Exit editing mode
        } catch (error) {
            console.error("Error updating section:", error);
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingSectionId(null);
        setEditedSectionName("");
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
                        {editingSectionId === section.id ? (
                            // If in editing mode, show input field for the section name
                            <div>
                                <input
                                    type="text"
                                    value={editedSectionName}
                                    onChange={(e) => setEditedSectionName(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(section.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            // If not in editing mode, show the section name as a link and buttons
                            <div>
                                <Link to={`/section/${section.id}/questions`}>
                                    {section.sectionName}
                                </Link>
                                <button onClick={() => handleEditClick(section)}>Edit</button>
                                <button onClick={() => handleDelete(section.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;

