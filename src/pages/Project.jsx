// Componentes React
import React, { useState, useEffect } from "react";

// Componentes UNITES
import Topbar from "../components/Topbar";

// Componentes de terceiros
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Modal,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Dimmer, Loader } from "semantic-ui-react";
import { CustomProvider, DatePicker } from "rsuite";
import { InputAdornment } from "@mui/material";

// Componentes UNITES
import Toast from "../components/toast";

// API UNITES
import {
  createProjeto,
  getEmpresa,
  getFinanciamentoBySeqPro,
  getProjeto,
} from "../services/endpoits";

// Estilos UNITES
import { style } from "../utils/utils";

// Funções de terceiros
import ptBR from "rsuite/locales/pt_BR";
import { useNavigate } from "react-router-dom";

// Icones MUI
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const Project = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataProjeto, setDataProjeto] = useState([]);
  const [dataEmpresa, setDataEmpresa] = useState([]);
  const [dataFinanciamento, setDataFinanciamento] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(dataProjeto);

  const mappedSeqEmp = dataFinanciamento.map((item) => ({
    seq_emp: item.seq_emp,
  }));

  const seqEmp = mappedSeqEmp.map((item) => item.seq_emp);

  const [selectedItemModal, setSelectedItemModal] = useState({
    nom_pro: "",
    des_pro: "",
    dth_inicio_pro: "",
    dth_final_pro: "",
    flg_status_pro: "",
    seq_usu_responsavel: "",
    seq_emp_list: [],
  });

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setIsLoading(false);
    setSelectedItemModal({
      nom_pro: "",
      des_pro: "",
      dth_inicio_pro: "",
      dth_final_pro: "",
      flg_status_pro: "",
      seq_usu_responsavel: "",
      seq_emp_list: [],
    });
  };

  const handleTogglePageActionsProject = (item) => {
    navigate("/actions_project", {
      state: {
        selectedData: item,
      },
    });
  };

  const handleSubmitEmpresa = async () => {
    setIsLoading(true);
    try {
      const response = await createProjeto({
        ...selectedItemModal,
        seq_usu_responsavel: JSON.parse(localStorage.getItem("id")),
      });
      if (response.Message === "All documents inserted!") {
        Toast("success", "Item inserido com sucesso!");
        setTimeout(() => {
          setIsLoading(false);
          handleCloseModal();
          fetchProjeto();
        }, 1500);
      } else {
        Toast("error", "Erro ao criar item!");
        setIsLoading(false);
      }
    } catch (error) {
      Toast("error", "Erro inesperado!");
      setIsLoading(false);
    }
  };

  const fetchProjeto = async () => {
    try {
      const response = await getProjeto();

      if (response.Message) {
        setDataProjeto(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmpresa = async () => {
    try {
      const response = await getEmpresa();

      if (response.Message) {
        setDataEmpresa(response.Message);
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

  useEffect(() => {
    fetchProjeto();
    fetchEmpresa();
  }, []);

  useEffect(() => {
    setSelectedItemModal({
      ...selectedItemModal,
      seq_emp_list: seqEmp,
    });
  }, [dataFinanciamento]);

  useEffect(() => {
    setFilteredData(
      dataProjeto.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [filter, dataProjeto]);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Projetos</span>
        <div className="content-actions">
          <Button
            variant="contained"
            endIcon={<AddOutlinedIcon />}
            onClick={handleOpenModal}
          >
            Criar
          </Button>
        </div>
      </div>
      <TextField
        placeholder="Digite"
        className="input-filter"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
        sx={{ width: 250 }}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="container-table">
        {filteredData.length > 0 ? (
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
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData?.length > 0 &&
                    filteredData.map((row, index) => (
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
                          {row.flg_status_pro === 1 ? "Concluído" : "Pendente"}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_completo_usu}
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
          </>
        ) : (
          <>
            <Dimmer active inverted>
              <Loader size="small" />
            </Dimmer>
          </>
        )}
      </div>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <span
            className="title"
            style={{ color: "#343434", fontSize: "1rem", fontWeight: 500 }}
          >
            {isEditing ? "Edite o" : "Cadastro de"} projeto
          </span>

          <TextField
            label="Título"
            type="text"
            variant="outlined"
            defaultValue={selectedItemModal && selectedItemModal.nom_pro}
            onChange={(e) => {
              setSelectedItemModal({
                ...selectedItemModal,
                nom_pro: e.target.value,
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
            defaultValue={selectedItemModal && selectedItemModal.des_pro}
            onChange={(e) => {
              setSelectedItemModal({
                ...selectedItemModal,
                des_pro: e.target.value,
              });
            }}
          />

          <div className="container">
            <CustomProvider locale={ptBR}>
              <DatePicker
                format="dd/MM/yyyy"
                placeholder="Data inicial"
                cleanable={true}
                placement="topEnd"
                onChange={(e) => {
                  setSelectedItemModal({
                    ...selectedItemModal,
                    dth_inicio_pro: e,
                  });
                }}
                value={
                  selectedItemModal.dth_inicio_pro
                    ? new Date(
                        new Date(selectedItemModal.dth_inicio_pro).toISOString()
                      )
                    : null
                }
              />
            </CustomProvider>
            <CustomProvider locale={ptBR}>
              <DatePicker
                name="dateFilter"
                format="dd/MM/yyyy"
                placeholder="Data final"
                cleanable={true}
                placement="topEnd"
                onChange={(e) => {
                  setSelectedItemModal({
                    ...selectedItemModal,
                    dth_final_pro: e,
                  });
                }}
                value={
                  selectedItemModal.dth_final_pro
                    ? new Date(
                        new Date(selectedItemModal.dth_final_pro).toISOString()
                      )
                    : null
                }
              />
            </CustomProvider>
          </div>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              defaultValue={
                selectedItemModal && selectedItemModal.flg_status_pro
              }
              onChange={(e) =>
                setSelectedItemModal({
                  ...selectedItemModal,
                  flg_status_pro: e.target.value,
                })
              }
            >
              <MenuItem value={1}>Concluído</MenuItem>
              <MenuItem value={0}>Pendente</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Ação de captação de recurso</InputLabel>
            <Select
              multiple
              label="Ação de captação de recurso"
              value={selectedItemModal.seq_emp_list || []}
              onChange={(e) =>
                setSelectedItemModal({
                  ...selectedItemModal,
                  seq_emp_list: e.target.value,
                })
              }
              renderValue={(selected) =>
                selected
                  .map((value) => {
                    const selectedCompany = dataEmpresa.find(
                      (item) => item.seq_emp === value
                    );
                    return selectedCompany ? selectedCompany.nom_emp : "";
                  })
                  .join(", ")
              }
            >
              {dataEmpresa.map((item) => (
                <MenuItem key={item.seq_emp} value={item.seq_emp}>
                  {item.nom_emp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="actions">
            <Button variant="contained" onClick={() => handleSubmitEmpresa()}>
              {isLoading ? (
                <Loader size={"tiny"} active inline="centered" />
              ) : (
                <>{isEditing ? "Editar" : "Salvar"}</>
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

export default Project;
