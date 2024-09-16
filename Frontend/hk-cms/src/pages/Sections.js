import SectionList from "../components/section-files/SectionList";
import AddSection from "../components/section-files/AddSection";


const Sections = () => {
 
  return (
    <div>
      <h1>Manage Sections</h1>
      {<AddSection/>}
      {<SectionList />}
    </div>
  );
};

export default Sections;
