// Componentes React
import React, { useState, useEffect } from "react";

// Componentes UNITES
import Topbar from "../components/Topbar";
import Toast from "../components/toast";

// Componentes de terceiros
import { Button, Modal, TextField, Typography } from "@mui/material";
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

// API UNITES
import {
  createInstituicao,
  deleteInstituicao,
  getInstituicao,
  updateInstituicao,
} from "../services/endpoits";

// Estilos UNITES
import { style } from "../utils/utils";

// Icones MUI
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const Institutions = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataInstituicoes, setDataInstituicoes] = useState([]);
  const [selectedItemModal, setSelectedItemModal] = useState({
    cod_cnpj_ins: "",
    nom_ins: "",
    nom_sigla_ins: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(dataInstituicoes);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setIsLoading(false);
    setSelectedItemModal({
      cod_cnpj_ins: "",
      nom_ins: "",
      nom_sigla_ins: "",
    });
  };

  const handleEditClick = (item) => {
    setSelectedItemModal(item);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleSubmitInstitutions = async () => {
    setIsLoading(true);
    try {
      if (isEditing) {
        const response = await updateInstituicao(selectedItemModal);
        console.log("response", response);
        if (response.Message === "All documents updated!") {
          Toast("success", "Item atualizado com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            handleCloseModal();
            fetchInstituicoes();
          }, 1500);
        } else if (
          response.Message === "Institution with informed CNPJ allready exists!"
        ) {
          Toast(
            "info",
            "Você está tentando criar uma instituição que já existe!"
          );
          setIsLoading(false);
        } else {
          Toast("error", "Erro ao atualizar item!");
          setIsLoading(false);
        }
      } else {
        const response = await createInstituicao(selectedItemModal);
        console.log("response", response);
        if (response.Message === "All documents inserted!") {
          Toast("success", "Item inserido com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            handleCloseModal();
            fetchInstituicoes();
          }, 1500);
        } else if (
          response.Message === "Institution with informed CNPJ allready exists!"
        ) {
          Toast(
            "info",
            "Você está tentando cadastrar uma instituição que já existe!"
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

  const handleDeleteInstitutions = async (id) => {
    try {
      const response = await deleteInstituicao(id);

      console.log(response);

      if (response.Message === "All documents deleted!") {
        Toast("success", "Item excluído com sucesso!");
        fetchInstituicoes();
        handleCloseModal();
      } else {
        Toast("error", "Erro ao excluir item, tente novamente!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstituicoes = async () => {
    try {
      const response = await getInstituicao();

      if (response.Message) {
        setDataInstituicoes(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInstituicoes();
  }, []);

  useEffect(() => {
    setFilteredData(
      dataInstituicoes.filter((item) =>
        ["nom_ins", "nom_sigla_ins", "cod_cnpj_ins"].some(
          (key) =>
            item[key] &&
            item[key].toString().toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [filter, dataInstituicoes]);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Instuições</span>
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
                    <TableCell>Sigla</TableCell>
                    <TableCell>CNPJ</TableCell>
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
                          {row.nom_ins}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_sigla_ins}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.cod_cnpj_ins}
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
                            onClick={() =>
                              handleDeleteInstitutions(row.seq_ins)
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
            {filter ? (
              <Typography sx={{ padding: 2, textAlign: "center" }}>
                Nenhum item encontrado para esse filtro aplicado
              </Typography>
            ) : (
              <Dimmer active inverted>
                <Loader size="small" />
              </Dimmer>
            )}
          </>
        )}
      </div>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <span
            className="title"
            style={{ color: "#343434", fontSize: "1rem", fontWeight: 500 }}
          >
            {isEditing ? "Edite a" : "Cadastro de"} produção acadêmica
          </span>

          <TextField
            label="Nome"
            type="text"
            variant="outlined"
            defaultValue={selectedItemModal && selectedItemModal.nom_ins}
            onChange={(e) => {
              setSelectedItemModal({
                ...selectedItemModal,
                nom_ins: e.target.value,
              });
            }}
          />

          <div className="container">
            <TextField
              label="Sigla"
              type="text"
              variant="outlined"
              defaultValue={
                selectedItemModal && selectedItemModal.nom_sigla_ins
              }
              onChange={(e) => {
                setSelectedItemModal({
                  ...selectedItemModal,
                  nom_sigla_ins: e.target.value,
                });
              }}
            />
            <ReactInputMask
              mask="99.999.999/9999-99"
              value={selectedItemModal && selectedItemModal.cod_cnpj_ins}
              onChange={(e) => {
                setSelectedItemModal({
                  ...selectedItemModal,
                  cod_cnpj_ins: e.target.value,
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
          </div>

          <div className="actions">
            <Button
              variant="contained"
              onClick={() => handleSubmitInstitutions()}
            >
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

export default Institutions;
