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
import { Dimmer, Loader } from "semantic-ui-react";
import { InputAdornment, TextField, Typography } from "@mui/material";

// Funções de terceiros
import { useNavigate } from "react-router-dom";

// Icones MUI
import ReceiptIcon from "@mui/icons-material/Receipt";

// API UNITES
import { getPesquisadores } from "../services/endpoits";

// Icones MUI
import SearchIcon from "@mui/icons-material/Search";

const Researchers = () => {
  const navigate = useNavigate();
  const [dataPesquisadores, setDataPesquisadores] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(dataPesquisadores);

  const handleTogglePage = (item) => {
    navigate("/curriculum", {
      state: {
        selectedData: item,
      },
    });
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

  useEffect(() => {
    setFilteredData(
      dataPesquisadores.filter((item) =>
        ["nom_completo_usu", "nom_ins", "nom_sigla_ins", "nom_gra"].some(
          (key) =>
            item[key] &&
            item[key].toString().toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [filter, dataPesquisadores]);

  return (
    <>
      <Topbar />
      <div className="container-actions">
        <span className="title">Pesquisadores</span>
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
          <TableContainer sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <Table
              sx={{ minWidth: 650, fontSize: "0.75rem" }}
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
                {filteredData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    <TableCell sx={{ fontSize: ".75rem", textAlign: "center" }}>
                      <ReceiptIcon
                        sx={{
                          width: "0.75em",
                          height: "0.75em",
                          cursor: "pointer",
                        }}
                        onClick={() => handleTogglePage(row)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    </>
  );
};

export default Researchers;
