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

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/pages/academicproductions.scss";
import { style } from "../utils/utils";

// Icones MUI
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AcademicProductions = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dados = [
    {
      título: "Estudo sobre mudanças climáticas",
      áreaAcadêmica: "Ciências Ambientais",
      descrição:
        "Pesquisa sobre os efeitos das mudanças climáticas na biodiversidade",
      período: "2020-2023",
      pesquisadores: ["João Silva", "Maria Santos"],
      tipoProdução: "Artigo Científico",
    },
    {
      título: "Desenvolvimento de algoritmo de inteligência artificial",
      áreaAcadêmica: "Ciência da Computação",
      descrição:
        "Projeto para criar um algoritmo de aprendizado de máquina para reconhecimento de padrões",
      período: "2021-2024",
      pesquisadores: ["Pedro Almeida", "Ana Oliveira", "Carlos Souza"],
      tipoProdução: "Software",
    },
    {
      título: "Estudo sobre economia comportamental",
      áreaAcadêmica: "Economia",
      descrição:
        "Pesquisa sobre como os comportamentos individuais afetam as decisões econômicas",
      período: "2019-2022",
      pesquisadores: ["Fernanda Costa", "Ricardo Santos"],
      tipoProdução: "Tese",
    },
  ];

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Produções</span>
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
                <TableCell>Título</TableCell>
                <TableCell>Área acadêmica</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Pesquisadores</TableCell>
                <TableCell>Tipo de produção</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dados.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {row.título}
                  </TableCell>
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {row.áreaAcadêmica}
                  </TableCell>
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {row.descrição}
                  </TableCell>
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {row.período}
                  </TableCell>
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {row.pesquisadores.join(", ")}
                  </TableCell>
                  <TableCell sx={{ fontSize: ".75rem" }}>
                    {row.tipoProdução}
                  </TableCell>
                  <TableCell sx={{ fontSize: ".75rem", textAlign: "center" }}>
                    <EditIcon
                      sx={{
                        width: "0.75em",
                        height: "0.75em",
                        cursor: "pointer",
                      }}
                    />
                    <DeleteIcon
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

export default AcademicProductions;
