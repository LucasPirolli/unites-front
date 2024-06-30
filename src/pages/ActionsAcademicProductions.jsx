// Componentes React
import { useEffect, useState } from "react";

// Componentes de terceiros
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CustomProvider, DatePicker, Loader } from "rsuite";
import { Dimmer } from "semantic-ui-react";

// Componentes UNITES
import Topbar from "../components/Topbar";
import Toast from "../components/toast";

// Funções de terceiros
import { useLocation, useNavigate } from "react-router-dom";
import ptBR from "rsuite/locales/pt_BR";

// Estilos UNITES
import "../dist/scss/pages/actionsacademicproductions.scss";

// Icones MUI
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getAreaAcademica,
  getInstituicao,
  getPesquisadores,
  getPesquisadoresBySeqPes,
  getProjetoBySeqPes,
  updatePesquisa,
} from "../services/endpoits";

const ActionsAcademicProductions = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(state?.selectedData);
  const [isUserAutorized, setIsUserAutorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dataAreasAcademicas, setDataAreasAcademicas] = useState([]);
  const [dataInstituicao, setDataInstituicao] = useState([]);
  const [dataPesquisadores, setDataPesquisadores] = useState([]);
  const [dataPesquisadoresSeqPes, setDataPesquisadoresSeqPes] = useState([]);
  const [dataProjetoSeqPes, setDataProjetoSeqPes] = useState([]);

  const checkIfUserIsResponsible = (idLogedUser) => {
    if (dataPesquisadoresSeqPes.length > 0) {
      const isAutorized = dataPesquisadoresSeqPes.some(
        (user) => user.seq_usu === idLogedUser
      );
      setIsUserAutorized(isAutorized);
    }
  };
  const mappedSeqUsu = dataPesquisadoresSeqPes.map((item) => ({
    seq_usu: item.seq_usu,
  }));

  const seqUsuIds = mappedSeqUsu.map((item) => item.seq_usu);

  const [selectedItem, setSelectedItem] = useState({
    seq_pes: selectedData.seq_pes,
    nom_pes: selectedData.nom_pes,
    des_pes: selectedData.des_pes,
    dth_publicacao_pes: new Date(
      new Date(selectedData.dth_publicacao_pes).toISOString().slice(0, -1)
    ),
    seq_are: selectedData.seq_are,
    seq_pro: selectedData.seq_pro,
    seq_ins: selectedData.seq_ins,
  });

  const handleSubmitAcademicProductions = async () => {
    setIsLoading(true);
    try {
      const response = await updatePesquisa({
        ...selectedItem,
        seq_usu_list: seqUsuIds,
      });

      if (response.Message === "All documents updated!") {
        Toast("success", "Item atualizado com sucesso!");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        Toast("error", "Erro ao atualizar item!");
        setIsLoading(false);
      }
    } catch (error) {
      Toast("error", "Erro inesperado!");
      setIsLoading(false);
    }
  };

  const handleTogglePageActionsProject = (item) => {
    navigate("/actions_project", {
      state: {
        selectedData: item,
      },
    });
  };

  const fetchAreaAcademica = async () => {
    try {
      const response = await getAreaAcademica();

      if (response.Message) {
        setDataAreasAcademicas(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
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

  const fetchPesquisadores = async () => {
    try {
      const response = await getPesquisadores();
      if (response.Message) {
        setDataPesquisadores(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPesquisadoresBySeqPes = async (id) => {
    try {
      const response = await getPesquisadoresBySeqPes(id);
      if (response.Message) {
        setDataPesquisadoresSeqPes(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjetoBySeqPes = async (id) => {
    try {
      const response = await getProjetoBySeqPes(id);
      if (response.Message) {
        setDataProjetoSeqPes(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreaAcademica();
    fetchInstituicaoData();
    fetchPesquisadores();
  }, []);

  useEffect(() => {
    fetchPesquisadoresBySeqPes(selectedData.seq_pes);
    fetchProjetoBySeqPes(selectedData.seq_pes);
  }, [selectedData]);

  useEffect(() => {
    checkIfUserIsResponsible(JSON.parse(localStorage.getItem("id")));
  }, [dataPesquisadoresSeqPes, localStorage.getItem("id")]);

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
            navigate("/academic_productions");
          }}
        />
        <span className="name-project">{selectedData.nom_pes}</span>
      </div>
      <div className="container-actions-academic-productions">
        {/* <TextField
          label="Título"
          type="text"
          variant="outlined"
          defaultValue={selectedData && selectedData.nom_pes}
          onChange={(e) => {
            setSelectedItem({
              ...selectedItem,
              nom_pes: e.target.value,
            });
          }}
        /> */}

        <TextField
          label="Descrição"
          type="text"
          variant="outlined"
          multiline
          rows={2}
          maxRows={4}
          disabled={!isUserAutorized}
          defaultValue={selectedItem && selectedItem.des_pes}
          onChange={(e) => {
            setSelectedItem({
              ...selectedItem,
              des_pes: e.target.value,
            });
          }}
        />

        {/* <div className="container"> */}
        {/* <FormControl fullWidth variant="outlined">
            <InputLabel>Área acadêmica</InputLabel>
            <Select
              label="Status"
              value={selectedData && selectedData.seq_are}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  seq_are: e.target.value,
                })
              }
            >
              {dataAreasAcademicas.map((item) => (
                <MenuItem key={item.seq_are} value={item.seq_are}>
                  {item.nom_are}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

        <FormControl fullWidth variant="outlined">
          <InputLabel>Entidades</InputLabel>
          <Select
            disabled={!isUserAutorized}
            label="Entidades"
            value={selectedItem && selectedItem.seq_ins}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
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

        <TextField
          label="Área acadêmica"
          type="text"
          variant="outlined"
          defaultValue={selectedData && selectedData.nom_are}
          disabled
        />

        {/* </div> */}
        <CustomProvider locale={ptBR}>
          <label
            className="label"
            style={{
              marginBottom: "-15px",
              color: "#1e232c",
              fontSize: "0.857rem",
            }}
          >
            Data publicação
          </label>
          <DatePicker
            format="dd/MM/yyyy"
            placeholder="Data publicação"
            cleanable={true}
            placement="bottomStart"
            onChange={(e) => {
              setSelectedItem({
                ...selectedItem,
                dth_publicacao_pes: e,
              });
            }}
            disabled={!isUserAutorized}
            value={
              selectedItem.dth_publicacao_pes
                ? selectedItem.dth_publicacao_pes
                : null
            }
          />
        </CustomProvider>
        {/* <FormControl fullWidth variant="outlined">
          <InputLabel>Pesquisadores envolvidos</InputLabel>
          <Select
            multiple
            label="Pesquisadores envolvidos"
            value={selectedItem.seq_usu_list || []}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                seq_usu_list: e.target.value,
              })
            }
            renderValue={(selected) =>
              selected
                .map((value) => {
                  const selectedResearchers = dataPesquisadores.find(
                    (item) => item.seq_usu === value
                  );
                  return selectedResearchers
                    ? selectedResearchers.nom_completo_usu
                    : "";
                })
                .join(", ")
            }
          >
            {dataPesquisadores.map((item) => (
              <MenuItem key={item.seq_usu} value={item.seq_usu}>
                {item.nom_completo_usu}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {dataPesquisadoresSeqPes.length > 0 && (
          <div className="container-table">
            <span className="title">Pesquisadores Participantes</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataPesquisadoresSeqPes.length > 0 ? (
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
                    {dataPesquisadoresSeqPes.map((row, index) => (
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

        {dataProjetoSeqPes.length > 0 && (
          <div className="container-table">
            <span className="title">Projeto Pai</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataProjetoSeqPes.length > 0 ? (
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
                    {dataProjetoSeqPes.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.seq_pro}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_pro}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.flg_status_pro === 1 ? "Concluído" : "Pendente"}
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
                            onClick={() => handleTogglePageActionsProject(row)}
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
        <div className="actions">
          <Button
            variant="contained"
            onClick={() => handleSubmitAcademicProductions()}
            sx={{ width: "100%", height: "44px" }}
            disabled={!isUserAutorized}
          >
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActionsAcademicProductions;
