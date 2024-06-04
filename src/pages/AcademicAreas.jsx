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

// Componentes UNITES
import Toast from "../components/toast";

// API UNITES
import {
  createAreaAcademica,
  deleteAreaAcademica,
  getAreaAcademica,
  updateAreaAcademica,
} from "../services/endpoits";

// Estilos UNITES
import { style } from "../utils/utils";

// Icones MUI
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AcademicAreas = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataAreasAcademicas, setDataAreasAcademicas] = useState([]);
  const [selectedItemModal, setSelectedItemModal] = useState({
    nom_are: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setIsLoading(false);
    setSelectedItemModal({
      nom_are: "",
    });
  };

  const handleEditClick = (item) => {
    setSelectedItemModal(item);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleSubmitAreaAcademica = async () => {
    setIsLoading(true);
    try {
      if (isEditing) {
        const response = await updateAreaAcademica(selectedItemModal);

        if (response.Message === "All documents updated!") {
          Toast("success", "Item atualizado com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            handleCloseModal();
            fetchAreaAcademica();
          }, 1500);
        } else {
          Toast("error", "Erro ao atualizar item!");
          setIsLoading(false);
        }
      } else {
        const response = await createAreaAcademica(selectedItemModal);
        if (response.Message === "All documents inserted!") {
          Toast("success", "Item inserido com sucesso!");
          setTimeout(() => {
            setIsLoading(false);
            handleCloseModal();
            fetchAreaAcademica();
          }, 1500);
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

  const handleDeleteAreaAcademica = async (id) => {
    try {
      const response = await deleteAreaAcademica(id);

      if (response.Message === "All documents deleted!") {
        Toast("success", "Item excluído com sucesso!");
        fetchAreaAcademica();
        handleCloseModal();
      } else {
        Toast("error", "Erro ao excluir item, tente novamente!");
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    console.log("selectedItemModal", selectedItemModal);
  }, [selectedItemModal]);

  useEffect(() => {
    fetchAreaAcademica();
  }, []);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Áreas acadêmicas</span>
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
      <div className="container-table">
        {dataAreasAcademicas.length > 0 ? (
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
                  {dataAreasAcademicas?.length > 0 &&
                    dataAreasAcademicas.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_are}
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
                              handleDeleteAreaAcademica(row.seq_are)
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
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <span
            className="title"
            style={{ color: "#343434", fontSize: "1rem", fontWeight: 500 }}
          >
            {isEditing ? "Edite a" : "Cadastro de"} área acadêmica
          </span>

          <TextField
            label="Nome"
            type="text"
            variant="outlined"
            defaultValue={selectedItemModal && selectedItemModal.nom_are}
            onChange={(e) => {
              setSelectedItemModal({
                ...selectedItemModal,
                nom_are: e.target.value,
              });
            }}
          />

          <div className="actions">
            <Button
              variant="contained"
              onClick={() => handleSubmitAreaAcademica()}
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

export default AcademicAreas;
