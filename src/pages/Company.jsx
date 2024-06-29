// Componentes React
import React, { useState, useEffect } from "react";

// Componentes UNITES
import Topbar from "../components/Topbar";

// Componentes de terceiros
import { Button, Modal, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Dimmer, Loader } from "semantic-ui-react";
import ReactInputMask from "react-input-mask";
import { InputAdornment } from "@mui/material";

// Componentes UNITES
import Toast from "../components/toast";

// API UNITES
import {
  createEmpresa,
  deleteEmpresa,
  getEmpresa,
  updateEmpresa,
} from "../services/endpoits";

// Estilos UNITES
import { style } from "../utils/utils";

// Icones MUI
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const Company = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataEmpresa, setDataEmpresa] = useState([]);
  const [selectedItemModal, setSelectedItemModal] = useState({
    cod_cnpj_emp: "",
    nom_emp: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(dataEmpresa);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setIsLoading(false);
    setSelectedItemModal({
      cod_cnpj_emp: "",
      nom_emp: "",
    });
  };

  const handleEditClick = (item) => {
    setSelectedItemModal(item);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleSubmitEmpresa = async () => {
    setIsLoading(true);
    try {
      if (isEditing) {
        const response = await updateEmpresa(selectedItemModal);

        if (response.Message === "All documents updated!") {
          Toast("success", "Item atualizado com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            handleCloseModal();
            fetchEmpresa();
          }, 1500);
        } else if (
          response.Message === "Company with informed CNPJ allready exists!"
        ) {
          Toast(
            "info",
            "Você está tentando cadastrar uma empresa que já existe!"
          );
          setIsLoading(false);
        } else {
          Toast("error", "Erro ao atualizar item!");
          setIsLoading(false);
        }
      } else {
        const response = await createEmpresa(selectedItemModal);
        if (response.Message === "All documents inserted!") {
          Toast("success", "Item inserido com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            handleCloseModal();
            fetchEmpresa();
          }, 1500);
        } else if (
          response.Message === "Company with informed CNPJ allready exists!"
        ) {
          Toast(
            "info",
            "Você está tentando cadastrar uma empresa que já existe!"
          );
          setIsLoading(false);
        } else {
          Toast("error", "Erro ao criar item!");
          setIsLoading(false);
        }
      }
    } catch (error) {
      Toast("error", "Erro inesperado!");
      setIsLoading(false);
    }
  };

  const handleDeleteEmpresa = async (id) => {
    try {
      const response = await deleteEmpresa(id);

      if (response.Message === "All documents deleted!") {
        Toast("success", "Item excluído com sucesso!");
        fetchEmpresa();
        handleCloseModal();
      } else {
        Toast("error", "Erro ao excluir item, tente novamente!");
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

  useEffect(() => {
    fetchEmpresa();
  }, []);

  useEffect(() => {
    setFilteredData(
      dataEmpresa.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [filter, dataEmpresa]);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Ação de captação de recurso</span>
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
                    <TableCell>Nome</TableCell>
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
                          {row.nom_emp}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.cod_cnpj_emp}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          <EditIcon
                            sx={{
                              width: "0.75em",
                              height: "0.75em",
                              cursor: "pointer",
                            }}
                            onClick={() => handleEditClick(row)}
                          />
                          <DeleteIcon
                            sx={{
                              width: "0.75em",
                              height: "0.75em",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteEmpresa(row.seq_emp)}
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
            {isEditing ? "Edite a" : "Cadastro de"} área acadêmica
          </span>

          <ReactInputMask
            mask="99.999.999/9999-99"
            value={selectedItemModal && selectedItemModal.cod_cnpj_emp}
            onChange={(e) => {
              setSelectedItemModal({
                ...selectedItemModal,
                cod_cnpj_emp: e.target.value,
              });
            }}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="CNPJ"
                type="text"
                variant="outlined"
              />
            )}
          </ReactInputMask>

          <TextField
            label="Nome"
            type="text"
            variant="outlined"
            defaultValue={selectedItemModal && selectedItemModal.nom_emp}
            onChange={(e) => {
              setSelectedItemModal({
                ...selectedItemModal,
                nom_emp: e.target.value,
              });
            }}
          />

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

export default Company;
