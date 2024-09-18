import React, { useState } from "react";
import AddSection from "../components/section-files/AddSection";
import SectionList from "../components/section-files/SectionList";
import "../css/Section.css"

const Sections = () => {
    const [fetchTrigger, setFetchTrigger] = useState(false);

    const triggerFetch = () => {
        setFetchTrigger((prev) => !prev); // Toggle fetch trigger to refetch sections
    };

    return (
        <div className="sections-page">
            <h1>Manage Sections</h1>
            <AddSection triggerFetch={triggerFetch} />
            <SectionList fetchSections={fetchTrigger} />
        </div>
    );
};

export default Sections;
