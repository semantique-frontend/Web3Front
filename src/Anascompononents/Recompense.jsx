import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/aaaaa.jpg";

// Material-UI imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

function Recompense() {
  const [data, setData] = useState([]);
  const [bonusFilter, setBonusFilter] = useState(""); // For bonus input
  const [scoreFilter, setScoreFilter] = useState(""); // For score input
  useEffect(() => {
    axios
      .get("http://localhost:8081/Anas/fetchAllRecompenseData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: "10px", marginBottom: "20px" }}>
        <TextField
          label="Bonus Higher Than"
          value={bonusFilter}
          onChange={(e) => setBonusFilter(e.target.value)}
          style={{
            marginRight: "10px",
            backgroundColor: "#0a1010",
            color: "green",
          }}
          InputProps={{ style: { color: "green" } }}
          InputLabelProps={{ style: { color: "green" } }}
        />
        <TextField
          label="Score Higher Than"
          value={scoreFilter}
          onChange={(e) => setScoreFilter(e.target.value)}
          style={{ backgroundColor: "#0a1010", color: "green" }}
          InputProps={{ style: { color: "green" } }}
          InputLabelProps={{ style: { color: "green" } }}
        />
      </div>
      <TableContainer
        component={Paper}
        style={{
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Table size="small">
          <TableHead style={{ backgroundColor: "#f7f7f7" }}>
            <TableRow>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Bonus
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Required Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) =>
                bonusFilter
                  ? parseFloat(row.bonus.replace(/[^\d.-]/g, "")) >
                    parseFloat(bonusFilter)
                  : true
              )
              .filter((row) =>
                scoreFilter ? row.requiredScore > parseFloat(scoreFilter) : true
              )
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{row.bonus}</TableCell>
                  <TableCell align="right">{row.requiredScore}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Recompense;
