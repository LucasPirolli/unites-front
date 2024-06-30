// Componentes React
import { useEffect, useState } from "react";

// Componentes UNITES
import Topbar from "../components/Topbar";
import Toast from "../components/toast";

// Componentes de terceiros
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dimmer, Loader } from "semantic-ui-react";

// Funções de terceiros
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

// Icones MUI
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// API UNITES
import {
  createConexao,
  deleteConexao,
  getConexaoBySeqUsu,
  getGrauAcademico,
  getInstituicao,
  getPesquisaBySeqUsu,
  getPesquisadoresConectadosBySeqUsu,
  getProjetoBySeqUsu,
  updateUser,
} from "../services/endpoits";

// Estilos UNITES
import "../dist/scss/pages/curriculum.scss";

const Curriculum = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [selectedData, setSelectedData] = useState(state?.selectedData);
  const [isUserAutorized, setIsUserAutorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isUserConected, setIsUserConected] = useState(false);

  const [dataInstituicao, setDataInstituicao] = useState([]);
  const [dataGrauAcademico, setDataGrauAcademico] = useState([]);
  const [dataProjeto, setDataProjeto] = useState([]);
  const [dataPesquisa, setDataPesquisa] = useState([]);
  const [dataPesquisadoresConectados, setDataPesquisadoresConectados] =
    useState([]);

  const [dataUsersConnect, setDataUsersConnect] = useState([]);

  const [userEditing, setUserEditing] = useState({
    seq_usu: selectedData.seq_usu,
    cod_cpf_usu: selectedData.cod_cpf_usu,
    nom_completo_usu: selectedData.nom_completo_usu,
    cod_senha_usu: selectedData.cod_senha_usu,
    pesquisador: selectedData.flg_pes_usu === 1 ? true : false,
    des_formacao_usu: selectedData.des_formacao_usu,
    seq_ins: selectedData.seq_ins,
    seq_gra: selectedData.seq_gra,
  });

  const handleSubmitUsers = async () => {
    setIsLoadingAction(true);
    try {
      const response = await updateUser(userEditing);
      if (response.Message === "All documents updated!") {
        Toast("success", "Item atualizado com sucesso!");
        setTimeout(() => {
          setIsLoadingAction(false);
        }, 1000);
      } else {
        Toast("error", "Erro ao atualizar item!");
        setIsLoadingAction(false);
      }
    } catch (error) {
      Toast("error", "Erro inesperado!");
      setIsLoading(false);
    }
  };

  const handleConnectUsers = async () => {
    setIsLoadingAction(true);

    try {
      const conectionUser = {
        seq_usu_envia: JSON.parse(localStorage.getItem("id")),
        seq_usu_recebe: selectedData.seq_usu,
      };

      const response = await createConexao(conectionUser);

      if (response.Message === "All documents inserted!") {
        setIsUserConected(true);
        Toast("success", "Usuário conectado com sucesso!");
        fetchConexaoBySeqUsu(selectedData.seq_usu);
        setTimeout(() => {
          setIsLoadingAction(false);
        }, 1000);
      } else {
        Toast("error", "Erro ao conectar usuário!");
        setIsLoadingAction(false);
      }
    } catch (error) {
      console.error("Failed to connect users:", error.message);
    }
  };

  const handleDesconnectUser = async () => {
    setIsLoadingAction(true);
    try {
      const deleteUser = {
        seq_usu_envia: JSON.parse(localStorage.getItem("id")),
        seq_usu_recebe: selectedData.seq_usu,
      };

      const response = await deleteConexao(deleteUser);

      if (response.Message === "All documents deleted!") {
        setIsUserConected(false);
        Toast("success", "Usuário desconectado!");
        fetchConexaoBySeqUsu(selectedData.seq_usu);
        setTimeout(() => {
          setIsLoadingAction(false);
        }, 1000);
      } else {
        Toast("error", "Erro ao desconectar usuário!");
        setIsLoadingAction(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoadingAction(false);
    }
  };

  const handleTogglePageActionsAcademicProductions = (item) => {
    navigate("/actions_academic_productions", {
      state: {
        selectedData: item,
      },
    });
  };

  const handleTogglePageActionsProject = (item) => {
    navigate("/actions_project", {
      state: {
        selectedData: item,
      },
    });
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

  const fetchProjetoBySeqUsu = async (id) => {
    try {
      const response = await getProjetoBySeqUsu(id);
      if (response.Message !== "No documents were found!") {
        setDataProjeto(response.Message);
      }
    } catch (error) {
      console.log(error);
      setDataProjeto([]);
    }
  };

  const fetchPesquisaBySeqUsu = async (id) => {
    try {
      const response = await getPesquisaBySeqUsu(id);
      if (response.Message !== "No documents were found!") {
        setDataPesquisa(response.Message);
      }
    } catch (error) {
      console.log(error);
      setDataPesquisa([]);
    }
  };

  const fetchPesquisadoresConectadosBySeqUsu = async (id) => {
    try {
      const response = await getPesquisadoresConectadosBySeqUsu(id);
      if (response.Message !== "No documents were found!") {
        setDataPesquisadoresConectados(response.Message);
      }
    } catch (error) {
      console.log(error);
      setDataPesquisadoresConectados([]);
    }
  };

  const fetchConexaoBySeqUsu = async (id) => {
    try {
      const response = await getConexaoBySeqUsu(id);
      if (response.Message !== "No documents were found") {
        setDataUsersConnect(response.Message);
      } else {
        setDataUsersConnect([]);
      }
    } catch (error) {
      console.log(error);
      setDataUsersConnect([]);
    }
  };

  const checkIfUserIsConnected = (clickedUserId) => {
    if (dataUsersConnect.length > 0) {
      const isConnected = dataUsersConnect.some(
        (user) => user.seq_usu === clickedUserId
      );
      setIsUserConected(isConnected);
    }
  };

  useEffect(() => {
    if (selectedData.seq_usu)
      localStorage.getItem("id") == selectedData.seq_usu
        ? setIsUserAutorized(true)
        : setIsUserAutorized(false);
  }, [selectedData]);

  useEffect(() => {
    fetchInstituicaoData();
    fetchGrauAcademico();
    fetchProjetoBySeqUsu(selectedData.seq_usu);
    fetchPesquisaBySeqUsu(selectedData.seq_usu);
    fetchPesquisadoresConectadosBySeqUsu(selectedData.seq_usu);
  }, [selectedData]);

  useEffect(() => {
    fetchConexaoBySeqUsu(selectedData.seq_usu);
  }, [selectedData.seq_usu]);

  useEffect(() => {
    checkIfUserIsConnected(JSON.parse(localStorage.getItem("id")));
  }, [selectedData.seq_usu, dataUsersConnect, localStorage.getItem("id")]);

  return (
    <>
      <Topbar />
      <div className="container-back-page">
        <ArrowBackIcon
          sx={{
            width: "0.75em",
            height: "0.75em",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/researchers");
          }}
        />
        <span className="name-user">{selectedData.nom_completo_usu}</span>
      </div>
      <div className="container-curriculum">
        <TextField
          label="Formação Acadêmica"
          disabled={!isUserAutorized}
          placeholder="Formação Acadêmica"
          defaultValue={selectedData && selectedData.des_formacao_usu}
          onChange={(e) =>
            setUserEditing({
              ...userEditing,
              des_formacao_usu: e.target.value,
            })
          }
        />
        <div className="container">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Entidades</InputLabel>
            <Select
              disabled={!isUserAutorized}
              label="Entidades"
              defaultValue={selectedData && selectedData.seq_ins}
              onChange={(e) =>
                setUserEditing({
                  ...userEditing,
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>Grau Acadêmico</InputLabel>
            <Select
              disabled={!isUserAutorized}
              label="Grau Acadêmico"
              defaultValue={selectedData && selectedData.seq_gra}
              onChange={(e) =>
                setUserEditing({
                  ...userEditing,
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
        </div>

        {dataUsersConnect.length > 0 && (
          <div className="container-table">
            <span className="title">Pesquisadores Conectados</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataUsersConnect.length > 0 ? (
              <TableContainer
                sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
              >
                <Table
                  sx={{
                    minWidth: 650,
                    fontSize: "0.75rem",
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataUsersConnect.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_completo_usu}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                NADA ENCONTRADO
              </div>
            )}
          </div>
        )}

        {dataPesquisa.length > 0 && (
          <div className="container-table">
            <span className="title">Produções Acadêmicas</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataPesquisa.length > 0 ? (
              <TableContainer
                sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
              >
                <Table
                  sx={{
                    minWidth: 650,
                    fontSize: "0.75rem",
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Título</TableCell>
                      <TableCell>Área</TableCell>
                      <TableCell>Instituição</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Projeto referente</TableCell>
                      <TableCell>Ação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPesquisa.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.seq_pes}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_pes}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_are}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_ins}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {format(row.dth_publicacao_pes, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_pro}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          <EditIcon
                            sx={{
                              width: "0.75em",
                              height: "0.75em",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleTogglePageActionsAcademicProductions(row)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                NADA ENCONTRADO
              </div>
            )}
          </div>
        )}

        {dataProjeto.length > 0 && (
          <>
            <div className="container-table">
              <span className="title">Projetos</span>
              {dataProjeto.length > 0 ? (
                <>
                  <TableContainer
                    sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                  >
                    <Table
                      sx={{
                        minWidth: 650,
                        fontSize: "0.75rem",
                      }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Título</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Responsável</TableCell>
                          <TableCell>Ação</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataProjeto?.length > 0 &&
                          dataProjeto.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell sx={{ fontSize: ".75rem" }}>
                                {row.seq_pro}
                              </TableCell>
                              <TableCell sx={{ fontSize: ".75rem" }}>
                                {row.nom_pro}
                              </TableCell>
                              <TableCell sx={{ fontSize: ".75rem" }}>
                                {row.flg_status_pro === 1
                                  ? "Concluído"
                                  : "Pendente"}
                              </TableCell>
                              <TableCell sx={{ fontSize: ".75rem" }}>
                                {row.nom_completo_usu_responsavel}
                              </TableCell>
                              <TableCell sx={{ fontSize: ".75rem" }}>
                                <EditIcon
                                  sx={{
                                    width: "0.75em",
                                    height: "0.75em",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleTogglePageActionsProject(row)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <>
                  <Dimmer active inverted>
                    <Loader size="small" />
                  </Dimmer>
                </>
              )}
            </div>
          </>
        )}

        <div className="actions">
          {isUserAutorized ? (
            <Button
              variant="contained"
              onClick={() => handleSubmitUsers()}
              sx={{ width: "100%", height: "44px" }}
            >
              Salvar
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={
                !isUserConected
                  ? () => handleConnectUsers()
                  : () => handleDesconnectUser()
              }
              sx={{ width: "100%", height: "44px" }}
              disabled={
                localStorage.getItem("isPesquisador") === "0" ? true : false
              }
            >
              {isLoadingAction ? (
                <Loader size={"tiny"} active inline="centered" />
              ) : (
                <>{!isUserConected ? "Conectar" : "Desconectar"}</>
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Curriculum;
