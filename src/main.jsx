// Componentes React
import React from "react";
import ReactDOM from "react-dom/client";

// Funções de terceiros
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas UNITES
import Login from "./pages/Login";
import Home from "./pages/Home";
import AcademicProductions from "./pages/AcademicProductions";

// Estilo UNITES
import "./main.scss";

// Estilos terceiros
import "semantic-ui-css/semantic.min.css";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/academic_productions" element={<AcademicProductions />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Main />
  </>
);
