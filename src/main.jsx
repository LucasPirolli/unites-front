// Componentes React
import React from "react";
import ReactDOM from "react-dom/client";

// Funções de terceiros
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes de terceiros
import { ToastContainer } from "react-toastify";

// Páginas UNITES
import Login from "./pages/Login";
import Home from "./pages/Home";
import AcademicProductions from "./pages/AcademicProductions";
import Institutions from "./pages/Institutions";

// Contexto UNITES
import { AuthProvider } from "./context/AuthContext";

// Estilo UNITES
import "./main.scss";

// Estilos terceiros
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/academic_productions" element={<AcademicProductions />} />
        <Route path="/institutions" element={<Institutions />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <ToastContainer />
      <Main />
    </AuthProvider>
  </>
);
