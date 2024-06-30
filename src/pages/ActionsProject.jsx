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
  Modal,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { CustomProvider, DatePicker, Loader } from "rsuite";
import { Dimmer } from "semantic-ui-react";

// Componentes UNITES
import Topbar from "../components/Topbar";
import Toast from "../components/toast";

// Funções de terceiros
import { useLocation, useNavigate } from "react-router-dom";
import ptBR from "rsuite/locales/pt_BR";
import { format } from "date-fns";

// Estilos UNITES
import "../dist/scss/pages/actionsproject.scss";
import { style } from "../utils/utils";

// Icones MUI
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// API UNITES
import {
  createPesquisa,
  getAreaAcademica,
  getConexaoBySeqUsu,
  getFinanciamentoBySeqPro,
  getInstituicao,
  getPesquisaBySeqPro,
  getPesquisadoresBySeqPro,
  updateProjeto,
} from "../services/endpoits";

const ActionsProject = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(state?.selectedData);
  const [isUserAutorized, setIsUserAutorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [dataPesquisadoresSeqPro, setDataPesquisadoresSeqPro] = useState([]);
  const [dataPesquisaSeqPro, setDataPesquisaSeqPro] = useState([]);
  const [dataFinanciamento, setDataFinanciamento] = useState([]);

  const [dataInstituicao, setDataInstituicao] = useState([]);
  const [dataAreasAcademicas, setDataAreasAcademicas] = useState([]);
  const [dataPesquisadores, setDataPesquisadores] = useState([]);

  const checkIfUserIsResponsible = (idLogedUser) => {
    if (selectedData) {
      const isAuthorized = selectedData.seq_usu_responsavel === idLogedUser;
      setIsUserAutorized(isAuthorized);
    }
  };

  const mappedSeqEmp = dataFinanciamento.map((item) => ({
    seq_emp: item.seq_emp,
  }));

  const seqEmp = mappedSeqEmp.map((item) => item.seq_emp);

  const [selectedItem, setSelectedItem] = useState({
    seq_pro: selectedData.seq_pro,
    nom_pro: selectedData.nom_pro,
    des_pro: selectedData.des_pro,
    dth_inicio_pro:
      new Date(
        new Date(selectedData.dth_inicio_pro).toISOString().slice(0, -1)
      ) || "",
    dth_final_pro:
      new Date(
        new Date(selectedData.dth_final_pro).toISOString().slice(0, -1)
      ) || "",
    flg_status_pro: selectedData.flg_status_pro,
    seq_usu_responsavel: selectedData.seq_usu_responsavel,
    seq_emp_list: [],
  });

  const handleTogglePageActionsAcademicProductions = (item) => {
    navigate("/actions_academic_productions", {
      state: {
        selectedData: item,
      },
    });
  };

  const [createProducao, setCreateProducao] = useState({
    nom_pes: "",
    des_pes: "",
    dth_publicacao_pes: "",
    seq_are: "",
    seq_pro: selectedData.seq_pro,
    seq_ins: "",
    seq_usu_list: [],
  });

  useEffect(() => {
    console.log("sele", selectedData);
  }, [selectedData]);

  const handleSubmitProject = async () => {
    setIsLoading(true);
    try {
      const response = await updateProjeto({
        ...selectedItem,
        seq_emp_list: seqEmp,
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

  const handleSubmitModal = async () => {
    console.log("entrou");
    setIsLoadingModal(true);
    try {
      const response = await createPesquisa(createProducao);

      if (response.Message === "All documents inserted!") {
        Toast("success", "Item inserido com sucesso!");
        setTimeout(() => {
          setIsLoadingModal(false);
          handleCloseModal();
          fetchPesquisaBySeqPro(selectedData.seq_pro);
        }, 1000);
      } else {
        Toast("error", "Erro ao criar item!");
        setIsLoadingModal(false);
      }
    } catch (error) {
      Toast("error", "Erro inesperado!");
      setIsLoadingModal(false);
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setIsLoadingModal(false);
    setCreateProducao({
      nom_pes: "",
      des_pes: "",
      dth_publicacao_pes: "",
      seq_are: "",
      seq_pro: selectedData.seq_pro,
      seq_ins: "",
      seq_usu_list: [],
    });
  };

  const fetchPesquisadoresBySeqPro = async (id) => {
    try {
      const response = await getPesquisadoresBySeqPro(id);
      if (response.Message !== "No documents were found") {
        setDataPesquisadoresSeqPro(response.Message);
      } else {
        setDataPesquisadoresSeqPro([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPesquisaBySeqPro = async (id) => {
    try {
      const response = await getPesquisaBySeqPro(id);
      if (response.Message !== "No documents were found!") {
        setDataPesquisaSeqPro(response.Message);
      } else {
        setDataPesquisaSeqPro([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFinanciamento = async (id) => {
    try {
      const response = await getFinanciamentoBySeqPro(id);

      if (response.Message !== "No documents were found!") {
        setDataFinanciamento(response.Message);
      } else {
        setDataFinanciamento([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Modal
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

  const fetchPesquisadores = async (id) => {
    try {
      const response = await getConexaoBySeqUsu(id);
      if (response.Message) {
        setDataPesquisadores(response.Message !== "No documents were found");
      } else {
        setDataPesquisadores([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPesquisadoresBySeqPro(selectedData.seq_pro);
    fetchPesquisaBySeqPro(selectedData.seq_pro);
    fetchFinanciamento(selectedData.seq_pro);
  }, [selectedData]);

  useEffect(() => {
    checkIfUserIsResponsible(JSON.parse(localStorage.getItem("id")));
  }, [dataPesquisadoresSeqPro, localStorage.getItem("id")]);

  useEffect(() => {
    setSelectedItem({
      ...selectedItem,
      seq_emp_list: seqEmp,
    });
  }, [dataFinanciamento]);

  useEffect(() => {
    console.log("create", createProducao);
  }, [createProducao]);

  useEffect(() => {
    fetchAreaAcademica();
    fetchInstituicaoData();
  }, []);

  useEffect(() => {
    fetchPesquisadores(JSON.parse(localStorage.getItem("id")));
  }, []);

  return (
    <>
      <Topbar />
      <div className="container-back-page-project">
        <div className="descriptions">
          <ArrowBackIcon
            sx={{
              width: "0.75em",
              height: "0.75em",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/project");
            }}
          />
          <span className="name-project">{selectedData.nom_pro}</span>
        </div>

        <div className="actions">
          <Button
            variant="contained"
            endIcon={<AddOutlinedIcon />}
            onClick={handleOpenModal}
            disabled={!isUserAutorized}
          >
            Nova Produção
          </Button>
        </div>
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
          defaultValue={selectedItem && selectedItem.des_pro}
          onChange={(e) => {
            setSelectedItem({
              ...selectedItem,
              des_pro: e.target.value,
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

        {/* </div> */}

        <FormControl fullWidth variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            defaultValue={selectedItem && selectedItem.flg_status_pro}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                flg_status_pro: e.target.value,
              })
            }
            disabled={!isUserAutorized}
          >
            <MenuItem value={1}>Concluído</MenuItem>
            <MenuItem value={0}>Pendente</MenuItem>
          </Select>
        </FormControl>

        <CustomProvider locale={ptBR}>
          <label
            className="label"
            style={{
              marginBottom: "-15px",
              color: "#1e232c",
              fontSize: "0.857rem",
            }}
          >
            Data início
          </label>
          <DatePicker
            format="dd/MM/yyyy"
            placeholder="Data início"
            cleanable={true}
            placement="bottomStart"
            onChange={(e) => {
              setSelectedItem({
                ...selectedItem,
                dth_inicio_pro: e,
              });
            }}
            disabled={!isUserAutorized}
            value={
              selectedItem.dth_inicio_pro ? selectedItem.dth_inicio_pro : null
            }
          />
        </CustomProvider>

        <CustomProvider locale={ptBR}>
          <label
            className="label"
            style={{
              marginBottom: "-15px",
              color: "#1e232c",
              fontSize: "0.857rem",
            }}
          >
            Data final
          </label>
          <DatePicker
            format="dd/MM/yyyy"
            placeholder="Data final"
            cleanable={true}
            placement="bottomStart"
            onChange={(e) => {
              setSelectedItem({
                ...selectedItem,
                dth_final_pro: e,
              });
            }}
            disabled={!isUserAutorized}
            value={
              selectedItem.dth_final_pro ? selectedItem.dth_final_pro : null
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
        {/* colocar tabela projeto pai */}
        <div className="container-table">
          <span className="title">Pesquisador responsável</span>
          <TableContainer sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
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
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {selectedData.nom_completo_usu_responsavel
                      ? selectedData.nom_completo_usu_responsavel
                      : selectedData.nom_completo_usu}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {dataPesquisadoresSeqPro.length > 0 && (
          <div className="container-table">
            <span className="title">Pesquisadores Participantes</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataPesquisadoresSeqPro.length > 0 ? (
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
                    {dataPesquisadoresSeqPro.map((row, index) => (
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

        {dataFinanciamento.length > 0 && (
          <div className="container-table">
            <span className="title">Ação de captação de recurso</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataFinanciamento.length > 0 ? (
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
                      <TableCell>Empresa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataFinanciamento.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_emp}
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

        {dataPesquisaSeqPro.length > 0 && (
          <div className="container-table">
            <span className="title">Produções Acadêmicas</span>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            ) : dataPesquisaSeqPro.length > 0 ? (
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
                      <TableCell>Data Publicação</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPesquisaSeqPro.map((row, index) => (
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

        <div className="actions">
          <Button
            variant="contained"
            onClick={() => handleSubmitProject()}
            sx={{ width: "100%", height: "44px" }}
            disabled={!isUserAutorized}
          >
            Salvar
          </Button>
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <span
            className="title"
            style={{ color: "#343434", fontSize: "1rem", fontWeight: 500 }}
          >
            Cadastro de produção acadêmica
          </span>

          <TextField
            label="Título"
            type="text"
            variant="outlined"
            defaultValue={createProducao && createProducao.nom_pes}
            onChange={(e) => {
              setCreateProducao({
                ...createProducao,
                nom_pes: e.target.value,
              });
            }}
          />

          <TextField
            label="Descrição"
            type="text"
            variant="outlined"
            multiline
            rows={2}
            maxRows={4}
            defaultValue={createProducao && createProducao.des_pes}
            onChange={(e) => {
              setCreateProducao({
                ...createProducao,
                des_pes: e.target.value,
              });
            }}
          />

          <div className="container">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Área acadêmica</InputLabel>
              <Select
                label="Status"
                value={createProducao && createProducao.seq_are}
                onChange={(e) =>
                  setCreateProducao({
                    ...createProducao,
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
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Entidades</InputLabel>
              <Select
                label="Entidades"
                value={createProducao && createProducao.seq_ins}
                onChange={(e) =>
                  setCreateProducao({
                    ...createProducao,
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
          </div>

          <CustomProvider locale={ptBR}>
            <DatePicker
              format="dd/MM/yyyy"
              placeholder="Data publicação"
              cleanable={true}
              placement="bottomStart"
              onChange={(e) =>
                setCreateProducao({
                  ...createProducao,
                  dth_publicacao_pes: e,
                })
              }
              // value={
              //   createProducao.dth_publicacao_pes
              //     ? createProducao.dth_publicacao_pes
              //     : null
              // }
            />
          </CustomProvider>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Pesquisadores envolvidos</InputLabel>
            <Select
              multiple
              label="Pesquisadores envolvidos"
              value={createProducao.seq_usu_list || []}
              onChange={(e) =>
                setCreateProducao({
                  ...createProducao,
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
              {dataPesquisadores?.length > 0 &&
                dataPesquisadores.map((item) => (
                  <MenuItem key={item.seq_usu} value={item.seq_usu}>
                    {item.nom_completo_usu}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <div className="actions">
            <Button variant="contained" onClick={() => handleSubmitModal()}>
              {isLoadingModal ? (
                <Loader size={"tiny"} active inline="centered" />
              ) : (
                "Salvar"
              )}
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Fechar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ActionsProject;
