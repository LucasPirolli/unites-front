// Componentes React
import React, { useState, useEffect } from "react";

// Componentes de terceiros
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/pages/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [valueRegisterUser, setValueRegisterUser] = useState({
    name: "",
    cpf: "",
    password: "",
    perfil: "",
    academic_degree: "",
    entity: "",
  });

  const handleActiveRegisterForm = () => {
    setIsRegister(!isRegister);
  };

  const handleTogglePage = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="container-login">
        <div className={`content-form ${isRegister && "register"}`}>
          <div className="container-title">
            <span className="title">Unites</span>
            <p className="description">Faça login para acessar a ferramenta</p>
          </div>
          <div className="container-inputs">
            {!isRegister ? (
              <>
                <TextField label="Usuário" variant="standard" />
                <TextField label="Senha" variant="standard" />
                <span
                  className="btn-newuser"
                  onClick={() => handleActiveRegisterForm()}
                >
                  Cadastre-se
                </span>
              </>
            ) : (
              <>
                <TextField
                  label="Nome"
                  variant="standard"
                  onChange={(e) =>
                    setValueRegisterUser({
                      ...valueRegisterUser,
                      name: e.target.value,
                    })
                  }
                />
                <TextField
                  label="CPF"
                  variant="standard"
                  onChange={(e) =>
                    setValueRegisterUser({
                      ...valueRegisterUser,
                      cpf: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Senha"
                  type="password"
                  variant="standard"
                  onChange={(e) =>
                    setValueRegisterUser({
                      ...valueRegisterUser,
                      password: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Confirmação de senha"
                  type="password"
                  variant="standard"
                />
                <FormControl fullWidth variant="standard">
                  <InputLabel>Perfil</InputLabel>
                  <Select
                    label="Perfil"
                    onChange={(e) =>
                      setValueRegisterUser({
                        ...valueRegisterUser,
                        perfil: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Visitante">Visitante</MenuItem>
                    <MenuItem value="Pesquisador">Pesquisador</MenuItem>
                  </Select>
                </FormControl>
                {valueRegisterUser.perfil === "Pesquisador" && (
                  <>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Grau acadêmico</InputLabel>
                      <Select
                        label="Grau acadêmico"
                        onChange={(e) =>
                          setValueRegisterUser({
                            ...valueRegisterUser,
                            academic_degree: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Curso Técnico - CTeSP">
                          Curso Técnico - CTeSP
                        </MenuItem>
                        <MenuItem value="Licenciatura">Licenciatura</MenuItem>
                        <MenuItem value="Mestrado">Mestrado</MenuItem>
                        <MenuItem value="Doutoramento">Doutoramento</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Entidades</InputLabel>
                      <Select
                        label="Entidades"
                        onChange={(e) =>
                          setValueRegisterUser({
                            ...valueRegisterUser,
                            entity: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Teste">Teste</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
                <span
                  className="btn-newuser"
                  onClick={() => handleActiveRegisterForm()}
                >
                  Entrar
                </span>
              </>
            )}
          </div>

          <button
            type="submit"
            className="btn-submit"
            onClick={() => {
              handleTogglePage();
            }}
          >
            {!isRegister ? "Entrar" : "Cadastrar"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
