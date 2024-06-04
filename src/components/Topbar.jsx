// Icones MUI
import SettingsIcon from "@mui/icons-material/Settings";

// Imagens UNITES
import Logo from "../assets/logo.svg";

// Fuções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/components/topbar.scss";

const Topbar = () => {
  const navigate = useNavigate();

  const handleTogglePage = () => {
    navigate("/home");
  };

  return (
    <div className="container-topbar">
      <div className="content-title">
        <img
          src={Logo}
          onClick={handleTogglePage}
          style={{ cursor: "pointer" }}
        />
      </div>
      <SettingsIcon />
    </div>
  );
};

export default Topbar;
