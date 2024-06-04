// Componentes React
import React, { useState, useEffect } from "react";

// Componentes UNITES
import Topbar from "../components/Topbar";

// Componentes de terceiros
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Modal,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dimmer, Loader } from "semantic-ui-react";

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/pages/researchers.scss";
import { style } from "../utils/utils";

// Icones MUI
import EditIcon from "@mui/icons-material/Edit";
import { getPesquisadores } from "../services/endpoits";

const Researchers = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataPesquisadores, setDataPesquisadores] = useState([]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
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

  useEffect(() => {
    fetchPesquisadores();
  }, []);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Pesquisadores</span>
      </div>
      <div className="container-table">
        {dataPesquisadores.length > 0 ? (
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
                    <TableCell>Instituição</TableCell>
                    <TableCell>Sigla</TableCell>
                    <TableCell>Grau acadêmico</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPesquisadores?.length > 0 &&
                    dataPesquisadores.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_completo_usu}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_ins}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_sigla_ins}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".75rem" }}>
                          {row.nom_gra}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: ".75rem", textAlign: "center" }}
                        >
                          <EditIcon
                            sx={{
                              width: "0.75em",
                              height: "0.75em",
                              cursor: "pointer",
                            }}
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
            Cadastro de produções acadêmicas
          </span>

          <TextField label="Título" type="text" variant="outlined" />

          <div className="container">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Área acadêmica</InputLabel>
              <Select label="Área acadêmica"></Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Pesquisadores</InputLabel>
              <Select label="Pesquisadores"></Select>
            </FormControl>
          </div>
          <TextField placeholder="Descrição" multiline rows={2} maxRows={4} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Período" localeText={"ptBR"} />
            </DemoContainer>
          </LocalizationProvider>
          <div className="container">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Tipo de produção</InputLabel>
              <Select label="Tipo de produção"></Select>
            </FormControl>
            <FormControlLabel
              labelPlacement="top"
              control={<Switch defaultChecked />}
              label="Status"
            />
          </div>

          <div className="actions">
            <Button variant="contained">Salvar</Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Fechar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Researchers;
