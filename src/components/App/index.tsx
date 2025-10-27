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
import { useEffect, useState } from "react";
import type Tool from "../../interfaces/Tool";
import type ToolsData from "../../interfaces/ToolsData";
import getRessource from "../../utils/getRessource";
import type ButSkill from "../../interfaces/ButSkill";
import type ButSkillsData from "../../interfaces/ButSkillsData";

const App: React.FC = () => {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [isToolsLoading, setIsToolsLoading] = useState<boolean>(true);
  const [allButSkills, setAllButSkills] = useState<ButSkill[]>([]);
  const [isButSkillsLoading, setIsButSkillLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const tools: ToolsData | false = (await getRessource("tools")) as
        | ToolsData
        | false;
      if (!tools) {
        console.error("Error when fetching tools");
        return;
      }
      setAllTools(tools.tools);
      setIsToolsLoading(false);
    })();
    (async () => {
      const butSkills: ButSkillsData | false = (await getRessource(
        "but-skills"
      )) as ButSkillsData | false;
      if (!butSkills) {
        console.error("Error when fetching tools");
        return;
      }
      setAllButSkills(butSkills.butSkills);
      setIsButSkillLoading(false);
    })();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <HomeSection />
        <AboutMeSection />
        <ProjectsSection
          allTools={allTools}
          isToolsLoading={isToolsLoading}
          allButSkills={allButSkills}
          isButSkillsLoading={isButSkillsLoading}
        />
        <SkillsSection allTools={allTools} isToolsLoading={isToolsLoading} />
        <TrainingsSection />
        <WorkExperiencesSection />
        <ContactSection />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
