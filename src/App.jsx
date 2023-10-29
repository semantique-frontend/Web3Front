import QuizPage from "./Anascompononents/QuizPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Recompense from "./Anascompononents/Recompense";
import "./App.css";
import Navbar from "./Anascompononents/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/Recompense" element={<Recompense />} />
      </Routes>
    </Router>
  );
}

export default App;
