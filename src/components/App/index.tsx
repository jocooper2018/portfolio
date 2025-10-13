import "./index.css";
import ThemeProvider from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import Header from "../Header";
import Home from "../Home";

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <Home />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
