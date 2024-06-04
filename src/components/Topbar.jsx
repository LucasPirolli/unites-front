// Icones MUI
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

// Imagens UNITES
import Logo from "../assets/logo.svg";

// Componentes UNITES
import Toast from "../components/toast";

// Fuções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/components/topbar.scss";

const Topbar = () => {
  const navigate = useNavigate();

  const handleTogglePage = () => {
    navigate("/home");
  };

  const handleLeave = () => {
    localStorage.clear();
    Toast("info", "Saindo...");
    setTimeout(() => {
      navigate("/");
    }, 1500);
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
      <div className="container-icons">
        <SettingsIcon
          sx={{
            width: "0.75em",
            height: "0.75em",
            cursor: "pointer",
          }}
        />
        <LogoutIcon
          sx={{
            width: "0.75em",
            height: "0.75em",
            cursor: "pointer",
          }}
          onClick={() => handleLeave()}
        />
      </div>
    </div>
  );
};

export default Topbar;
