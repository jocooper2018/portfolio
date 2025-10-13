import "./index.css";
import LanguageSelect from "../LanguageSelect";
import ThemeSelect from "../ThemeSelect";

const Header: React.FC = () => {
  return (
    <header>
      <div>Portfolio</div>
      <div>
        <LanguageSelect />
        <ThemeSelect />
      </div>
    </header>
  );
};

export default Header;
