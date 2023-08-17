import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../reducers/studentSlice";
import { Button, TextField, Grid, Box, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State for the alert
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent({ name, age, grade }));
    setName("");
    setAge("");
    setGrade("");
    setIsAlertOpen(true); // Open the alert after successful submission
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false); // Close the alert
    navigate("/list");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px", height: "200px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Age" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Add Student
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Snackbar for displaying the alert message */}
      <Snackbar open={isAlertOpen} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Student Added Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentForm;
