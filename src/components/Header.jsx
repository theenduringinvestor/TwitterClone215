import "../styles/Header.css";
import xLogo from "../assets/X-Logo.png";

function Header() {
  return (
    <header className="header">
      <img className="header-logo" src={xLogo} alt="X logo" />
    </header>
  );
}

export default Header;
