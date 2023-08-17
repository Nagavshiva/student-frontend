import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import EditStudentForm from "./components/EditStudentForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Container, Grid } from "@mui/material";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/list" element={<StudentList />} />
        <Route path="/edit/:id" element={<EditStudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
