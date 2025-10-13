import "./index.css";
import ThemeProvider from "../../contexts/ThemeContext";
import ThemeSelect from "../ThemeSelect";
import { LanguageProvider } from "../../contexts/LanguageContext";
import LanguageSelect from "../LanguageSelect";

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div>
          <ThemeSelect />
        </div>
        <div>
          <LanguageSelect />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
