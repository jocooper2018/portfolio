import type { ResolvedTheme } from "../contexts/ThemeContext";
import type Icon from "../interfaces/Icon";

const getIconUrlForTheme = (icon: Icon, theme: ResolvedTheme) => {
  if (theme === "dark" && icon.urlLight) {
    return icon.urlLight;
  } else if (theme === "light" && icon.urlDark) {
    return icon.urlDark;
  } else {
    return icon.url;
  }
};

export default getIconUrlForTheme;
