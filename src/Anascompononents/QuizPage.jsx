import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TextField } from "@mui/material";
import Questionpopup from "./quesitonpopup";
import background from "../assets/background.jpg";

function QuizPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [questionsForModal, setQuestionsForModal] = useState([]);
  const [niveauDiff, setNiveauDiff] = useState(""); // for storing the selected filter

  const handleRowClick = (quizID) => {
    // Fetch the questions for the clicked quiz
    fetch(`http://localhost:8081/Anas/fetchAllQuestionsForAllQuizzes`)
      .then((response) => response.json())
      .then((data) => {
        const relatedQuestions = data.filter((item) => item.quiz === quizID);
        setQuestionsForModal(relatedQuestions);
        setModalOpen(true); // Open the modal
      });
  };

  const fetchData = (filterValue = niveauDiff, searchValue = searchTerm) => {
    let url = "http://localhost:8081/Anas/fetchallQuizes";
    if (filterValue) {
      url = `http://localhost:8081/Anas/fetchQuizesByNiveauDiff?niveauDiff=${filterValue}`;
    }
    if (searchValue) {
      url = `http://localhost:8081/Anas/fetchQuizesByTitreQuiz?titre=${searchValue}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.message || "Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [niveauDiff, searchTerm]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchData(niveauDiff, value);
  };

  const handleNiveauDiffChange = (event) => {
    const value = event.target.value;
    setNiveauDiff(value);
    fetchData(value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Search by Title"
        variant="filled"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "5px",
        }} // Set the background to white
        InputProps={{
          style: {
            color: "black", // Set the text color to black for readability
          },
        }}
        InputLabelProps={{
          style: {
            color: "black", // Set the label color to black for readability
          },
        }}
      />

      {/* Filter */}
      <FormControl
        variant="filled"
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "5px",
          height: "50px",
          width: "200px",
        }}
      >
        <InputLabel style={{ color: "black" }}>Niveau Diff</InputLabel>
        <Select
          value={niveauDiff}
          onChange={handleNiveauDiffChange}
          style={{ color: "black" }} // Set the dropdown text color to black
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "white", // Set the dropdown background color to white
              },
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Expert">Expert</MenuItem>
        </Select>
      </FormControl>

      {/* Table */}
      <Paper
        elevation={3}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell>*/}
              <TableCell>descriptionQuiz</TableCell>
              <TableCell>niveauDiff</TableCell>
              <TableCell>titreQuiz</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={`${item.quiz}-${index}`}
                onClick={() => handleRowClick(item.quiz)}
              >
                {/*  <TableCell>{item.quiz}</TableCell>*/}
                <TableCell>{item.descriptionQuiz}</TableCell>
                <TableCell>{item.niveauDiff}</TableCell>
                <TableCell>{item.titreQuiz}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Questionpopup
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        questions={questionsForModal}
      />
    </div>
  );
}

export default QuizPage;
