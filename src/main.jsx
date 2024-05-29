// Componentes React
import React from "react";
import ReactDOM from "react-dom/client";

// Funções de terceiros
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas UNITES
import Login from "./pages/Login";
import Home from "./pages/Home";

// Estilo UNITES
import "./main.scss";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Main />
  </>
);
