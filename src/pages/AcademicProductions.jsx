// Componentes React
import React, { useState, useEffect } from "react";

// Componentes UNITES
import Topbar from "../components/Topbar";

// Componentes de terceiros
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Estilos UNITES
import "../dist/scss/pages/academicproductions.scss";

// Icones MUI
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getPesquisa } from "../services/endpoits";
import { format } from "date-fns";
import { Dimmer, Loader } from "semantic-ui-react";

const AcademicProductions = () => {
  const navigate = useNavigate();
  const [dataPesquisa, setDataPesquisa] = useState([]);

  const handleTogglePageActionsAcademicProductions = (item) => {
    navigate("/actions_academic_productions", {
      state: {
        selectedData: item,
      },
    });
  };

  const fetchPesquisa = async () => {
    try {
      const response = await getPesquisa();
      if (response.Message) {
        setDataPesquisa(response.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPesquisa();
  }, []);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Produções Acadêmicas</span>
      </div>
      {dataPesquisa.length > 0 ? (
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
                  <TableCell>Descrição</TableCell>
                  <TableCell>Área acadêmica</TableCell>
                  <TableCell>Período</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataPesquisa.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: ".75rem" }}>
                      {row.nom_pes}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".75rem" }}>
                      {row.des_pes}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".75rem" }}>
                      {row.nom_are}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".75rem" }}>
                      {format(row.dth_publicacao_pes, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell sx={{ fontSize: ".75rem", textAlign: "center" }}>
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
        </div>
      ) : (
        <>
          <Dimmer active inverted>
            <Loader size="small" />
          </Dimmer>
        </>
      )}
    </>
  );
};

export default AcademicProductions;
