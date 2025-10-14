import "./index.css";
import ThemeProvider from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import Header from "../Header";
import HomeSection from "../HomeSection";
import AboutMeSection from "../AboutMeSection";
import ProjectsSection from "../ProjectsSection";
import TrainingsSection from "../TrainingsSection";

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <HomeSection />
        <AboutMeSection />
        <ProjectsSection />
        <TrainingsSection />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
