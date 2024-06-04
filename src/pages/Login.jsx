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

// Imagens UNITES
import Logo from "../assets/logo.svg";

// Estilos UNITES
import "../dist/scss/pages/login.scss";
import { createUser, getGrauAcademico, getInstituicao } from "../services/endpoits";
import ReactInputMask from "react-input-mask";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [dataInstituicao, setDataInstituicao] = useState([]);
  const [dataGrauAcademico, setDataGrauAcademico] = useState([]);
  const [valueRegisterUser, setValueRegisterUser] = useState({
    NOM_COMPLETO_USU: "",
    COD_CPF_USU: "",
    COD_SENHA_USU: "",
    PESQUISADOR: "",
    SEQ_GRA: "",
    SEQ_INS: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleActiveRegisterForm = () => {
    setIsRegister(!isRegister);
  };

  const handleTogglePage = () => {
    navigate("/home");
  };

  const fetchInstituicaoData = async () => {
    try {
      const response = await getInstituicao();
      if (response.Message) {
        setDataInstituicao(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGrauAcademico = async () => {
    try {
      const response = await getGrauAcademico();
      if (response.Message) {
        setDataGrauAcademico(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumitLogin = async () => {
    setIsLoading(true);
    try {
      const response = await createUser(valueRegisterUser);
      console.log("User created successfully:", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstituicaoData();
    fetchGrauAcademico();
  }, []);

  return (
    <>
      <div className="container-login">
        <div className={`content-form ${isRegister && "register"}`}>
          <div className="container-title">
            <img src={Logo} />
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
                      NOM_COMPLETO_USU: e.target.value,
                    })
                  }
                />
                <ReactInputMask
                  mask="999.999.999-99"
                  value={valueRegisterUser.COD_CPF_USU}
                  onChange={(e) => {
                    setValueRegisterUser({
                      ...valueRegisterUser,
                      COD_CPF_USU: e.target.value,
                    });
                  }}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      label="CPF"
                      type="text"
                      variant="standard"
                    />
                  )}
                </ReactInputMask>
                <TextField
                  label="Senha"
                  type="password"
                  variant="standard"
                  onChange={(e) =>
                    setValueRegisterUser({
                      ...valueRegisterUser,
                      COD_SENHA_USU: e.target.value,
                    })
                  }
                />
                <FormControl fullWidth variant="standard">
                  <InputLabel>Perfil</InputLabel>
                  <Select
                    label="Perfil"
                    onChange={(e) => {
                      const isPesquisador = e.target.value === "Pesquisador";
                      setValueRegisterUser({
                        ...valueRegisterUser,
                        PESQUISADOR: isPesquisador,
                      });
                    }}
                  >
                    <MenuItem value="Visitante">Visitante</MenuItem>
                    <MenuItem value="Pesquisador">Pesquisador</MenuItem>
                  </Select>
                </FormControl>
                {valueRegisterUser.PESQUISADOR && (
                  <>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Grau acadêmico</InputLabel>
                      <Select
                        label="Grau acadêmico"
                        onChange={(e) =>
                          setValueRegisterUser({
                            ...valueRegisterUser,
                            SEQ_GRA: e.target.value,
                          })
                        }
                      >
                        {dataGrauAcademico.map((item) => (
                          <MenuItem key={item.seq_gra} value={item.seq_gra}>
                            {item.nom_gra}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Entidades</InputLabel>
                      <Select
                        label="Entidades"
                        onChange={(e) =>
                          setValueRegisterUser({
                            ...valueRegisterUser,
                            SEQ_INS: e.target.value,
                          })
                        }
                      >
                        {dataInstituicao.map((item) => (
                          <MenuItem key={item.seq_ins} value={item.seq_ins}>
                            {item.nom_ins}
                          </MenuItem>
                        ))}
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
              handleSumitLogin();
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
