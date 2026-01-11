/*
 *  A personal portfolio website to showcase projects.
 *  Copyright (C) 2026  Matthieu LE BOUT
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
import Burger from "../Burger";
import Footer from "../Footer";
import ImagesViewer from "../ImagesViewer";
import type Project from "../../interfaces/Project";

const showBurgerMediaQuery: MediaQueryList = window.matchMedia(
  "screen and (max-width: 1320px)"
);

const App: React.FC = () => {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [isToolsLoading, setIsToolsLoading] = useState<boolean>(true);
  const [allButSkills, setAllButSkills] = useState<ButSkill[]>([]);
  const [isButSkillsLoading, setIsButSkillLoading] = useState<boolean>(true);
  const [showBurger, setShowBurger] = useState<boolean>(
    showBurgerMediaQuery.matches
  );
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const [imagesToView, setImagesToView] = useState<Project | undefined>(
    undefined
  );

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

    window.addEventListener("resize", () => {
      setShowBurger(showBurgerMediaQuery.matches);
    });
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header
          showBurger={showBurger}
          setIsBurgerMenuOpen={setIsBurgerMenuOpen}
        />
        {showBurger && (
          <Burger isOpen={isBurgerMenuOpen} setIsOpen={setIsBurgerMenuOpen} />
        )}
        <ImagesViewer
          project={imagesToView}
          setProject={setImagesToView}
        />
        <HomeSection />
        <AboutMeSection />
        <ProjectsSection
          allTools={allTools}
          isToolsLoading={isToolsLoading}
          allButSkills={allButSkills}
          isButSkillsLoading={isButSkillsLoading}
          setImagesToView={setImagesToView}
        />
        <SkillsSection allTools={allTools} isToolsLoading={isToolsLoading} />
        <TrainingsSection allTools={allTools} isToolsLoading={isToolsLoading} />
        <WorkExperiencesSection
          allTools={allTools}
          isToolsLoading={isToolsLoading}
        />
        <ContactSection />
        <Footer />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
