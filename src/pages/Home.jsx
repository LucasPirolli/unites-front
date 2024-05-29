import React, { useState, useEffect } from "react";

import Topbar from "../components/Topbar";

// Estilos UNITES
import "../dist/scss/pages/home.scss";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InventoryIcon from '@mui/icons-material/Inventory';

const Home = () => {
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
      description: "A produção é definida como uma atividade ou processo que garante que um serviço, produto ou mesmo objeto seja feito/produzido."
    }

  ];
  return (
    <>
      <Topbar />
      <div className="container-home">
        {infoCards.map((item, index) => {
          return (
            <div className="card" key={index}>
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
