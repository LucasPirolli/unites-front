import React, { useEffect } from "react";

// Componentes UNITER
import Topbar from "../components/Topbar";

// Componentes de terceiros
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InventoryIcon from "@mui/icons-material/Inventory";
import CastleIcon from "@mui/icons-material/Castle";
import SchoolIcon from "@mui/icons-material/School";

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/pages/home.scss";

// Contexto UNITES
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useAuth();
  const infoCards = [
    {
      icon: <PersonSearchIcon />,
      title: "Pesquisadores",
      description:
        "Membros graduados ou pós-graduados da equipe de pesquisa, direta e criativamente envolvidos com a realização de projetos e com a produção científica, tecnológica e artística do grupo.",
    },
    {
      icon: <InventoryIcon />,
      title: "Produções",
      description:
        "A produção é definida como uma atividade ou processo que garante que um serviço, produto ou mesmo objeto seja feito/produzido.",
    },
    {
      icon: <CastleIcon />,
      title: "Instituições",
      description:
        "Uma instituição acadêmica é um lugar onde pessoas de diferentes idades obtêm educação.",
    },
    {
      icon: <SchoolIcon />,
      title: "Áreas acadêmicas",
      description:
        "Disciplina, disciplina científica, disciplina académica ou disciplina acadêmica designam um determinado ramo do conhecimento",
    },
  ];

  const visibleInfoCards = infoCards.filter((card) => {
    if (isAdmin === 1) {
      return true;
    } else {
      return card.title === "Pesquisadores" || card.title === "Produções";
    }
  });

  const handleTogglePage = (page) => {
    if (page === "Pesquisadores") {
      navigate("/researchers");
    } else if (page === "Produções") {
      navigate("/academic_productions");
    } else if (page === "Instituições") {
      navigate("/institutions");
    } else {
      navigate("/academic_productions");
    }
  };

  useEffect(() => {
    if (typeof isAdmin !== "number")
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
  }, [typeof isAdmin !== "number"]);

  return (
    <>
      <Topbar />
      <div className="container-home">
        {visibleInfoCards.map((item, index) => {
          return (
            <div
              className="card"
              key={index}
              onClick={() => {
                handleTogglePage(item.title);
              }}
            >
              <div className="content-icon">{item.icon}</div>
              <div className="content">
                <span className="title">{item.title}</span>
                <p className="description">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
