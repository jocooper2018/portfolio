import type { ResolvedTheme } from "../contexts/ThemeContext";
import type Tool from "../interfaces/Tool";

const getLogoForTheme = (tool: Tool, theme: ResolvedTheme) => {
  if (theme === "dark" && tool.logoLight) {
    return tool.logoLight;
  } else if (theme === "light" && tool.logoDark) {
    return tool.logoDark;
  } else {
    return tool.logo;
  }
};

export default getLogoForTheme;
