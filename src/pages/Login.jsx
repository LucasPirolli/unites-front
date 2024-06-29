// Componentes React
import React, { useState, useEffect } from "react";

// Componentes de terceiros
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Loader } from "semantic-ui-react";
import ReactInputMask from "react-input-mask";

// Componentes UNITES
import Toast from "../components/toast";

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Imagens UNITES
import Logo from "../assets/logo.svg";

// Estilos UNITES
import "../dist/scss/pages/login.scss";

// API UNITES
import {
  createUser,
  getGrauAcademico,
  getInstituicao,
  getLogin,
} from "../services/endpoits";

// Contexto UNITES
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [dataInstituicao, setDataInstituicao] = useState([]);
  const [dataGrauAcademico, setDataGrauAcademico] = useState([]);
  const [valueRegisterUser, setValueRegisterUser] = useState({
    nom_completo_usu: "",
    cod_cpf_usu: "",
    cod_senha_usu: "",
    pesquisador: "",
    seq_gra: "",
    seq_ins: "",
  });
  const { cpf, setCpf, password, setPassword, setIsAdmin } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleActiveRegisterForm = () => {
    setIsRegister(!isRegister);
    setValueRegisterUser({
      nom_completo_usu: "",
      cod_cpf_usu: "",
      cod_senha_usu: "",
      pesquisador: "",
      seq_gra: "",
      seq_ins: "",
    });
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

  const handleSubmitLogin = async (type) => {
    setIsLoading(true);

    try {
      if (type === "register") {
        let userData = { ...valueRegisterUser };

        if (!userData.pesquisador) {
          delete userData.seq_gra;
          delete userData.seq_ins;
        }

        const response = await createUser(userData);

        if (response.Message === "All documents inserted!") {
          Toast("success", "Cadastro realizado com sucesso!");

          setTimeout(() => {
            setIsLoading(false);
            setIsRegister(false);
          }, 1500);
        }
      } else if (type === "login") {
        const response = await getLogin(cpf, password);
        if (response.Message !== "No documents were found") {
          localStorage.setItem("id", response.Message[0].seq_usu);
          localStorage.setItem("cpf", cpf);
          localStorage.setItem("password", password);
          localStorage.setItem("isAdmin", response.Message[0].flg_adm_usu);

          Toast("success", "Login realizado com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/home");
          }, 1500);
        } else {
          Toast("error", "Verifique as credenciais e tente novamente!");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Toast("error", "Erro inesperado, recarregue a página e tente novamente!");
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
                <ReactInputMask
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
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
                      nom_completo_usu: e.target.value,
                    })
                  }
                />
                <ReactInputMask
                  mask="999.999.999-99"
                  value={valueRegisterUser.COD_CPF_USU}
                  onChange={(e) => {
                    setValueRegisterUser({
                      ...valueRegisterUser,
                      cod_cpf_usu: e.target.value,
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
                      cod_senha_usu: e.target.value,
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
                        pesquisador: isPesquisador,
                      });
                    }}
                  >
                    <MenuItem value="Visitante">Visitante</MenuItem>
                    <MenuItem value="Pesquisador">Pesquisador</MenuItem>
                  </Select>
                </FormControl>
                {valueRegisterUser.pesquisador && (
                  <>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Grau acadêmico</InputLabel>
                      <Select
                        label="Grau acadêmico"
                        onChange={(e) =>
                          setValueRegisterUser({
                            ...valueRegisterUser,
                            seq_gra: e.target.value,
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
                            seq_ins: e.target.value,
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
              handleSubmitLogin(!isRegister ? "login" : "register");
            }}
          >
            {isLoading ? (
              <Loader size={"tiny"} active inline="centered" />
            ) : (
              <>{!isRegister ? "Entrar" : "Cadastrar"}</>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
