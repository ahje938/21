import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../css/NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle Back to Questions navigation
  const handleBackToQuestions = () => {
    const sectionId = location.state?.fromSectionId;
    if (sectionId) {
      navigate(`/section/${sectionId}/questions`);
    } else {
      // Fallback to /sections if no sectionId is found
      navigate('/sections');
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/sections">Back to Sections</Link>
        </li>
        {location.pathname.startsWith('/question/') && (
          <li>
            <button onClick={handleBackToQuestions}>Back to Questions</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
