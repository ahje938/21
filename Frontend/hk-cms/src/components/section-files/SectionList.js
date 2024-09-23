import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Section.css";

const SectionList = ({ fetchSections }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editedSectionName, setEditedSectionName] = useState("");

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get("https://localhost:7263/api/section");
        setSections(response.data.$values || response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sections:", error);
        setLoading(false);
      }
    };
    fetchSectionData();
  }, [fetchSections]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7263/api/section/${id}`);
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
      await axios.put(`https://localhost:7263/api/section/${id}`, { Name: editedSectionName });
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSave(section.id);
                    }
                  }}
                />
                <button type="submit">Lagre</button>
                <button type="button" onClick={handleCancelEdit}>Kansellere</button>
              </form>
            ) : (
              <div>
                <Link to={`/section/${section.id}/questions`}>
                  {section.sectionName}
                </Link>
                <button onClick={() => handleEdit(section)}>Oppdater</button>
                <button onClick={() => handleDelete(section.id)}>Slett</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
