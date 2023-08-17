import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../reducers/studentSlice";
import { Button, TextField, Grid, Box, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false); 
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && grade) {
      dispatch(addStudent({ name, age, grade }));
      setName("");
      setAge("");
      setGrade("");
      setIsAlertOpen(true); 
      setIsErrorAlertOpen(false); 
      navigate("/list"); 
    } else {
      setIsErrorAlertOpen(true);
      setIsAlertOpen(false);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false); 
  };

  const handleCloseErrorAlert = () => {
    setIsErrorAlertOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px", height: "200px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
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
      {/* Snackbar for displaying the success alert */}
      <Snackbar open={isAlertOpen} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Student Added Successfully!
        </Alert>
      </Snackbar>
      {/* Snackbar for displaying the error alert */}
      <Snackbar open={isErrorAlertOpen} autoHideDuration={5000} onClose={handleCloseErrorAlert}>
        <Alert onClose={handleCloseErrorAlert} severity="error" sx={{ width: '100%' }}>
          Please fill in all fields before submitting.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentForm;
