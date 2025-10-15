import "./index.css";
import ThemeProvider from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import Header from "../Header";
import HomeSection from "../HomeSection";
import AboutMeSection from "../AboutMeSection";
import ProjectsSection from "../ProjectsSection";
import TrainingsSection from "../TrainingsSection";
import SkillsSection from "../SkillsSection";
import WorkExperiencesSection from "../WorkExperiencesSection";
import ContactSection from "../ContactSection";

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <HomeSection />
        <AboutMeSection />
        <ProjectsSection />
        <SkillsSection />
        <TrainingsSection />
        <WorkExperiencesSection />
        <ContactSection />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
