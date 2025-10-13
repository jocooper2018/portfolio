import "./index.css";
import ThemeProvider from "../../contexts/ThemeContext";
import ThemeSelect from "../ThemeSelect";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      Bonjour
      <ThemeSelect />
    </ThemeProvider>
  );
}

export default App;
