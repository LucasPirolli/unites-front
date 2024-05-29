import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SettingsIcon from "@mui/icons-material/Settings";

// Componentes de terceiros
import { Icon } from "@mui/material";

// Estilos UNITES
import "../dist/scss/components/topbar.scss";

const Topbar = () => {
  return (
    <div className="container-topbar">
      <div className="content-title">
        <span className="title">Unites</span> <ThunderstormIcon color="green" />
      </div>
      <SettingsIcon />
    </div>
  );
};

export default Topbar;
