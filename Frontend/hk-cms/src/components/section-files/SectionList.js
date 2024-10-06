import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get, put, del } from "../../services/Api"; // Import your API methods
import "../../css/Section.css";

const SectionList = ({ fetchSections }) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [editedSectionName, setEditedSectionName] = useState("");

    useEffect(() => {
        const fetchSectionsData = async () => {
            try {
                const data = await get("/section"); 
                setSections(data.$values || data);
            } catch (error) {
                console.error("Error fetching sections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectionsData();
    }, [fetchSections]); // Fetch sections whenever fetchSections changes

    const handleDelete = async (id) => {
        try {
            await del(`/section/${id}`); 
            setSections(sections.filter((section) => section.id !== id));
        } catch (error) {
            console.error("Error deleting section:", error);
        }
    };

    const handleEdit = (section) => {
        setEditingSectionId(section.id);
        setEditedSectionName(section.sectionName);
    };

    const handleSave = async (id) => {
        try {
            await put(`/section/${id}`, { Name: editedSectionName }); 
            setSections(
                sections.map((section) =>
                    section.id === id ? { ...section, sectionName: editedSectionName } : section
                )
            );
            setEditingSectionId(null);
        } catch (error) {
            console.error("Error updating section:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingSectionId(null);
    };

    if (loading) return <p>Loading sections...</p>;
    if (sections.length === 0) return <p>Ingen moduler tilgjengelig</p>;

    return (
        <div className="section-list-container">
            <h3>Modul liste</h3>
            <ul>
                {sections.map((section) => (
                    <li key={section.id} className="section-list-item">
                        {editingSectionId === section.id ? (
                            <form onSubmit={(e) => { e.preventDefault(); handleSave(section.id); }}>
                                <input
                                    type="text"
                                    value={editedSectionName}
                                    onChange={(e) => setEditedSectionName(e.target.value)}
                                />
                                <button type="submit" className="btn-save">Lagre</button>
                                <button type="button" className="btn-cancel" onClick={handleCancelEdit}>Kansellere</button>
                            </form>
                        ) : (
                            <div>
                                <Link to={`/section/${section.id}/questions`}>
                                    {section.sectionName}
                                </Link>
                                <button className="btn-edit" onClick={() => handleEdit(section)}>Oppdater</button>
                               <button className="btn-delete" onClick={() => handleDelete(section.id)}>Slett</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionList;



